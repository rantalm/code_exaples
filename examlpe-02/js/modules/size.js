const size = () => {
    let size

    if(screen.width > 1640 ) {
        size = 'larger'
    }
    if(screen.width <= 1640 && screen.width > 1000) {
        size = 'large'
    }
    if(screen.width <= 1000 && screen.width > 500) {
        size = 'medium'
    }
    if(screen.width <= 500) {
        size = 'small'
    }

    return size

    //console.log(size, 'Mobile:'+mobile)
}

const mobile = () => {
    let mobile = false

    if(screen.width <= 500) {
        mobile = true;
    }
    
    return mobile
}

export default {size, mobile}