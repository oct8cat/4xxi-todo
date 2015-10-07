import ich from 'icanhaz'

export function init () {
    ich.grabTemplates()
}

export function tpl (id) {
    return ich.templates[`tpl-${id}`]
}

export default tpl
