import { HTTP_METHODS, HTTP_STATUSES, ResponseError } from './index'

const validateRoute = ({ path, method, handler, middlewares = [] }) => {
  if (typeof path !== 'string') {
    throw new Error('Route path should be a string')
  }

  if (!Object.values(HTTP_METHODS).includes(method)) {
    throw new Error('Unsupported http method')
  }

  if (typeof handler !== 'function') {
    throw new Error('API handler should be a function')
  }

  if (middlewares && Array.isArray(middlewares) && middlewares.some(f => typeof f !== 'function')) {
    throw new Error('Middleware should be a function')
  }
}

const getParams = (req) => ({ ...req.params, ...req.body, ...req.files })

const setMiddleware = (app, { method, path }, middleware) => {
  app[method](path, async (req, res, next) => {
    try {
      await middleware(getParams(req))
      next()
    } catch (err) {
      console.error(err, `${method} ${path}`)
      if (err instanceof ResponseError) {
        res.status(err.status).json({ error: err.getErrorMessage() })
      } else {
        res.status(HTTP_STATUSES.BAD_REQUEST).json({ error: 'Bad request' })
      }
    }
  })
}

const setRoute = (app, { method, path, handler }) => {
  app[method](path, async (req, res) => {
    try {
      const result = await handler(getParams(req))
      res.status(HTTP_STATUSES.OK).json(result)
      console.info(`${method.toUpperCase()} ${path}`)
    } catch (err) {
      console.error(err, `${method} ${path}`)
      if (err instanceof ResponseError) {
        res.status(err.status).json({ error: err.getErrorMessage() })
      } else {
        res.status(HTTP_STATUSES.SERVER_ERROR).json({ error: 'Server error' })
      }
    }
  })
}

export const initRouter = (app, routes) => {
  try {
    routes(HTTP_METHODS).forEach((route) => {
      validateRoute(route)


      const { middlewares } = route
      if (middlewares) {
        middlewares.forEach((middleware) => {
          setMiddleware(app, route, middleware)
        })
      }

      setRoute(app, route)
    })
  } catch (err) {
    console.error(err)
  }
}
