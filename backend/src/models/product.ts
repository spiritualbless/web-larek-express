import  mongoose from 'mongoose';


export interface IProductImage {
    fileName: String,
    originalName: String,
};

export interface IProduct {
    title: String;
    image: IProductImage;
    category: String;
    description: String;
    price: number | null;
};

const imageProductSchema = new mongoose.Schema<IProductImage>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema<IProduct>({
    title: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
        unique: true,
    },
    image: {
        type: imageProductSchema,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: null,
    },
});



export default mongoose.model<IProduct>('product', productSchema);