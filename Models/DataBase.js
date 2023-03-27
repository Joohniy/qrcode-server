const mongoose = require('mongoose');

const DataBaseQRSchema = new mongoose.Schema({
   name: { type: String, required: false },
   linkedin: { type: String, required: false },
   github: { type: String, required: false },
});

const DataBaseQR = mongoose.model('QRCodee', DataBaseQRSchema);

class QRCodeStore {
    constructor(body) {
        this.body = body;
        this.users = null;
        this.erros = [];
    }

    async registerInformation() {
        this.user = await DataBaseQR.create(this.body);
        return this.user;
    }

    async findEspecificUser() {
        this.user = await DataBaseQR.findOne({ name: this.body.name });
        return this.user;
    }

    async findUserById(id) {
        this.user = await DataBaseQR.findById(id)
        return this.user;
    }
}

module.exports = QRCodeStore;