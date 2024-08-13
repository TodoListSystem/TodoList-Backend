const mongoose = require("mongoose");

const TodosSchema = mongoose.Schema(
  {
    baslik: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    icerik: {
      type: String,
      minlength: 3,
      maxlength: 255,
    },
    note: {
      type: String,
      minlength: 3,
      maxlength: 255,
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
