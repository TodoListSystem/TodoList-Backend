const mongoose = require("mongoose");

const TodosSchema = mongoose.Schema(
  {
    baslik: {
      type: String,
      required: true,
      unique: true,
    },
    icerik: {
      type: String,
      maxlength: 255,
      default: "",
    },
    note: {
      type: String,
      maxlength: 255,
      default: "",
    },
    yapildi: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const todosModel = mongoose.model("Todo", TodosSchema);

module.exports = todosModel;
