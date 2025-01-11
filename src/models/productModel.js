import mongoose from "mongoose";

const statusEnum = {"AVAILABLE": "AVAILABLE", "UNAVAILABLE": "UNAVAILABLE", "DISCONTINUED": "DISCONTINUED"};

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Product name is required"],
        maxlength: 30,
        minlength: 3,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        maxlength: 300,
        minlength: 3,
        trim: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: 0,
    },
    profitRate: {
        type: Number,
        default: 1.21,
        min: [1, "Profit rate must be at least 1"],
    },
    descripcion: {
        type: String,
        Quantity: {
            type: Number,
            required: [true, "Product quantity is required"],
            min: 0,
        },
        status: {
            type:String,
            validate:{
                validator: function (status) {
                    return statusEnum.includes(status);
                },
                message: props => `${props.value} is not a valid status`,
            }
        },
    },

    category: {type: mongoose.Schema.Types.ObjectId, ref: "category"},
    highlighted: {
        type: Boolean,
        default: false, 
    },

    creationDate: {
        type: Date,
        default: Date.now(),
    },
    stock: {
        type: Number,
        min: 0,
    },


    }
);

productSchema.methods.decreaseStock = function (amount) {
    if (this.stock < amount) {
        throw new Error("Not enough stock");
    }
    this.stock -= amount; 
    return this.save();
};

productSchema.virtual("priceWithProfit").get(function () {
    return this.price * this.profitRate;
});

productSchema.set("toJSON", {virtuals: true});
productSchema.set("toObject", {virtuals: true});

export default mongoose.model("product", productSchema);