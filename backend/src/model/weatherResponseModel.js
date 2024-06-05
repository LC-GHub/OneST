class weatherResponseModel {
    constructor(valid_loc, location, forecast, valid_start = "", valid_end = "") {
        this.valid_loc = valid_loc;
        this.location = location;
        this.forecast = forecast;
        this.valid_start = valid_start;
        this.valid_end = valid_end;
    }
}

module.exports = weatherResponseModel;