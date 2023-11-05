import pino from 'pino'

const pinoConfig = {
  browser: {
    asObject: true,
  },
}

const logger = pino(pinoConfig)

type Option = {
  caller: string
  status: number
}

export const loggerError = (message: string, option: Option) => {
  return logger.error(option, message)
}

export const loggerWarn = (message: string, option: Option) => {
  return logger.warn(option, message)
}

export const loggerInfo = (message: string, option: Option) => {
  return logger.info(option, message)
}
