const returnResponse = (res, data, msg, code = 200, status = true) => {
    return res.status(code).json({
        status,
        message: msg,
        data: data
    })
}

module.exports =  {
    returnResponse,
};