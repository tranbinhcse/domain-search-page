import routes from '../routers'

const mixinRoutes = [...routes]

const appClientMenus = mixinRoutes.map((el) => {
  const { name, path, meta, redirect, children } = el
  return {
    name,
    path,
    meta,
    redirect,
    children
  }
})

export default appClientMenus
