import antlr4 from 'antlr4'
import { Python2Lexer } from './generated/Python2Lexer'
import { Python2Parser } from './generated/Python2Parser'
import { Python2Listener } from './generated/Python2Listener'

class IPs {
  $push (nodename, portname, ips) {
    this.$get(nodename, portname)
      .push(...(
        Array.isArray(ips)
          ? ips
          : [ips]
      ))
  }
  $get (nodename, portname) {
    const node = this[nodename] || (this[nodename] = {})
    const port = node[portname] || (node[portname] = [])
    return port
  }
}

function parse (input) {
  const chars = new antlr4.InputStream(input)
  const lexer = new Python2Lexer(chars)
  const tokens = new antlr4.CommonTokenStream(lexer)
  const parser = new Python2Parser(tokens)
  parser.buildParseTrees = true
  return parser.file_input()
}

function processArgsCtx (argsCtx) {
  const funcCtx = argsCtx.parentCtx.parentCtx
  const funcNameIndex = funcCtx.children.indexOf(argsCtx.parentCtx) - 1
  const funcName = funcCtx.children[funcNameIndex].getText()

  let varName
  if (
    funcCtx.children.length >= 2 &&
    funcCtx.children[0].getText() === 'net' &&
    funcCtx.children[1].getText() === '.get'
  ) {
    varName = pyString(funcCtx.children[2].children[1].getText())
  } else if (funcNameIndex > 0) {
    varName = funcCtx.children[0].getText()
  } else {
    varName = null
  }

  return {
    funcCtx, funcNameIndex, funcName, varName
  }
}

function pyString (str) {
  if (!/^'.*'$/.test(str)) {
    throw new TypeError('Expected string.')
  } else {
    return str.substr(1, str.length - 2)
  }
}
function pyNumber (str) {
  if (isNaN(str)) {
    throw new TypeError('Expected number.')
  } else {
    return str * 1
  }
}
function pyNotNull (str) {
  return str && str !== 'None'
}

function fixNextHostDev (set, hostDev) {
  let [host, dev] = hostDev.split('-')
  if (dev == null) {
    let i = 0
    do {
      dev = `eth${i}`
      hostDev = `${host}-${dev}`
      ++i
    } while (set.has(hostDev))
    set.add(hostDev)
    return hostDev
  }
  return hostDev
}

function MyListener ({ enterArglist, enterAssignment }) {
  Python2Listener.call(this)
  this.visited = new Set()
  this.enterArglistCb = enterArglist
  this.enterAssignmentCb = enterAssignment
  return this
}
MyListener.prototype = Object.create(Python2Listener.prototype)
MyListener.prototype.constructor = MyListener
MyListener.prototype.enterArglist = function (ctx) {
  if (this.visited.has(ctx)) {
    return
  }
  this.visited.add(ctx)

  this.enterArglistCb(ctx)
}
MyListener.prototype.enterExpr_stmt = function (ctx) {
  if (ctx.children.length === 3 && ctx.children[1].getText() === '=') {
    this.enterAssignmentCb(ctx)
  }
}

export default function (input) {
  const associations = []
  const hostIPs = {}
  const ips = new IPs()
  const items = []
  const links = []
  const portMap = {}
  const scriptLines = []
  const vars = {}
  let lastId = 0

  const printer = new MyListener({
    enterArglist: argsCtx => {
      const args = argsCtx.children.map(child => {
        if (!child.children) {
          return child.getText()
        } else {
          return child.children.map(child => {
            const text = child.getText()
            if (text.startsWith('[')) {
              if (text === '[]') {
                return []
              } else {
                return text.substr(1, text.length - 2).split(',')
              }
            } else {
              return text
            }
          })
        }
      }).filter(val =>
        val !== ','
      ).reduce((acc, val, i, arr) => {
        if (val === '**') {
          // Ignore
        } else if (arr[i - 1] === '**') {
          try {
            const varName = val[0]
            const value = vars[varName] // ctx
              .getText() // Python dictionary
              .replace(/'/g, '"') // JSON (hopefully)
            const obj = JSON.parse(value)

            // Use the same format as use non dict values
            Object.keys(obj).forEach(key => {
              const val = obj[key]
              switch (typeof val) {
                case 'number':
                  obj[key] = `${val}`
                  break
                case 'string':
                  obj[key] = `'${val}'`
                  break
              }
            })

            Object.assign(acc, obj)
          } catch (error) {
            console.warn(error)
          }
        } else if (val.length === 1) {
          acc[i] = val[0]
        } else {
          acc[val[0]] = val[2]
        }
        return acc
      }, {})

      const { funcName, varName } = processArgsCtx(argsCtx)

      if (funcName === '.onecmd') {
        // Script
        scriptLines.push(pyString(args[0]))
      } else if (funcName === '.addLink') {
        // Link
        const item = {
          id: 'script_import_' + ++lastId,
          type: 'link',
          from: args.intfName1
            ? pyString(args.intfName1)
            : args[0],
          to: args.intfName2
            ? pyString(args.intfName2)
            : args[1]
        }

        if (args.bw) {
          item.bandwidth = pyNumber(args.bw)
        }
        if (args.delay) {
          item.delay = pyString(args.delay)
        }
        if (args.loss) {
          item.loss = pyNumber(args.loss)
        }
        if (args.max_queue_size) {
          item.maxQueueSize = pyNumber(args.max_queue_size)
        }
        if (args.jitter) {
          item.jitter = pyString(args.jitter)
        }

        links.push(item)
      } else if (funcName === '.start') {
        // Association switch → controller
        const hostnameTo = varName
        args[0].forEach(hostnameFrom => {
          const item = {
            id: 'script_import_' + ++lastId,
            type: 'association',
            from: hostnameFrom,
            to: hostnameTo
          }

          associations.push(item)
        })
      } else if (funcName === '.addHost') {
        // Host
        const hostname = pyString(args[0])
        const item = {
          id: 'script_import_' + ++lastId,
          type: 'host',
          hostname
        }
        if (pyNotNull(args.defaultRoute)) {
          item.defaultRoute = args.defaultRoute.replace(/.*via\s+([0-9a-fA-F.:]+).*/, '$1')
        }
        if (pyNotNull(args.ip)) {
          hostIPs[item.hostname] = pyString(args.ip)
        }

        items.push(item)
      } else if (funcName === '.addSwitch') {
        // Switch
        const hostname = pyString(args[0])
        const item = {
          id: 'script_import_' + ++lastId,
          type: 'switch',
          hostname
        }
        if (args.batch) {
          item.batch = args.batch === 'True'
        }
        if (args.datapath) {
          item.datapath = pyString(args.datapath)
        }
        if (args.dpid) {
          item.dpid = pyString(args.dpid)
        }
        if (args.dpopts) {
          item.dpopts = pyString(args.dpopts)
        }
        if (args.opts) {
          item.opts = pyString(args.opts)
        }
        if (args.failMode) {
          item.failMode = pyString(args.failMode)
        }
        if (args.inband) {
          item.inband = args.inband === 'True'
        }
        if (args.protocols) {
          item.protocol = pyString(args.protocols)
        }
        if (args.reconnectms) {
          item.reconnectms = args.reconnectms
        }
        if (args.ip) {
          item.ip = pyString(args.ip)
        }
        if (args.port) {
          item.dpctlPort = args.port
        }
        if (args.verbose) {
          item.verbose = args.verbose === 'True'
        }
        if (args.stp) {
          item.stp = args.stp === 'True'
        }
        if (args.prio) {
          item.stpPriority = args.prio
        }
        if (args.cls) {
          item.switchType = args.cls.replace(/.*\./, '')
        }

        items.push(item)
      } else if (funcName === '.addController') {
        // Controller
        const hostname = pyString(args[0] || args.name)
        const item = {
          id: 'script_import_' + ++lastId,
          type: 'controller',
          hostname
        }
        if (args.controller) {
          item.controllerType = args.controller.replace(/.*\./, '')
        }
        if (args.ip) {
          item.ip = pyString(args.ip)
        }
        if (args.port) {
          item.port = pyNumber(args.port)
        }
        if (args.protocol) {
          item.protocol = pyString(args.protocol)
        }

        items.push(item)
      } else if (funcName === '.cmd' && /^'ip a a .* dev .*'$/.test(args[0])) {
        // Port IPs
        const { 1: ip, 3: portname } = /^'ip a a (.*) dev ([^-]+-)?([^-]+)'$/.exec(args[0])
        const nodename = varName
        ips.$push(nodename, portname, ip)
      } else if (funcName === '.Intf') {
        // Physical port
        const nodename = args.node
        const portname = pyString(args[0])
        if (nodename) {
          ips.$get(nodename, portname).physical = true
        } else {
          const item = {
            id: 'script_import_' + ++lastId,
            type: 'port',
            physical: true,
            hostname: portname
          }

          items.push(item)
        }
      }
    },
    enterAssignment: assignmentCtx => {
      const name = assignmentCtx.children[0].getText()
      const value = assignmentCtx.children[2]
      vars[name] = value
    }
  })

  // Process the tree
  const tree = parse(input)
  const walker = new antlr4.tree.ParseTreeWalker()
  walker.walk(printer, tree)
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(printer, tree)

  // Prepare ports without IPs
  const hostDevs = new Set()
  links.forEach(link => hostDevs.add(link.from).add(link.to))
  links.forEach(edge => {
    edge.from = fixNextHostDev(hostDevs, edge.from)
    edge.to = fixNextHostDev(hostDevs, edge.to)
  })
  links.forEach(edge => {
    ;[edge.from, edge.to].forEach(hostDev => {
      const [nodename, portname] = hostDev.split('-')

      ips.$push(nodename, portname, hostIPs[nodename] || [])
      delete hostIPs[nodename]
    })
  })

  // Set up ports
  Object.keys(ips).forEach(host => {
    Object.keys(ips[host]).forEach(dev => {
      // Port
      const port = {
        id: 'script_import_' + ++lastId,
        type: 'port',
        hostname: dev
      }

      const ipList = ips[host][dev]
      if (ipList.length) {
        port.ips = [...ipList] // Without additional properties
      }
      if (ipList.physical) {
        port.physical = true
      }

      items.push(port)

      // Association
      const edge = {
        id: 'script_import_' + ++lastId,
        type: 'association',
        from: items.find(item => item.hostname === host).id,
        to: port.id
      }
      items.push(edge)

      portMap[`${host}-${dev}`] = port.id
    })
  })

  // Set up associations (can't be done before all nodes are in items)
  associations.forEach(edge => {
    edge.from = items.find(item => item.hostname === edge.from).id
    edge.to = items.find(item => item.hostname === edge.to).id
    items.push(edge)
  })

  // Set up links (can't be done before all ports are in items)
  links.forEach(edge => {
    edge.from = portMap[edge.from]
    edge.to = portMap[edge.to]
    items.push(edge)
  })

  return {
    version: 0,
    script: scriptLines.join('\n'),
    items
  }
}