class uenResponseModel {
    constructor(valid, message = "", error = "") {
        this.valid = valid;
        this.message = message;
        this.error = error;
    }
}

module.exports = uenResponseModel;