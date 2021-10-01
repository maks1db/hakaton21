export const fieldTemplates = {};

export const parseFieldTemplates = () => {
    const items = document.querySelectorAll('[template=column]')

    items.forEach(x => {
        
        // @ts-ignore
        fieldTemplates[x.getAttribute('name')] = x.innerHTML;
    })
}