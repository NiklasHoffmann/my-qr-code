import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

// Asynchronous function to dynamically import images
const loadImage = async (imageName) => {
    try {
        const module = await import(`media/dump/${imageName}.jpg`)
        return module.default
    } catch (error) {
        console.error("Error loading the image:", error)
        return null
    }
}

const Images = ({ imageName, className }) => {
    const [imageSrc, setImageSrc] = useState(null)

    useEffect(() => {
        loadImage(imageName).then(setImageSrc)
    }, [imageName])

    return imageSrc ? <img src={imageSrc} className={className} alt={imageName} /> : null
}

Images.propTypes = {
    imageName: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default Images
