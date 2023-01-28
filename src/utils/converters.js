function String2boolArray(s){

    const cleanString = s.replace('[','').replace(']', '').replace('\n', '')
    const arr = cleanString.split(" ")
    const r = arr.map(v => {
        if(v === 'true') return true
        if(v === 'false') return false

        console.error(`value '${v}' getted. Show be boolean`)
        return false
    })

    return r;
}

export {String2boolArray}