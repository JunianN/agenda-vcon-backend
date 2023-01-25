import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
        default: 'ADMIN',
      },
    },
    { timestamps: true }
  );
  
  const Admin = mongoose.model('Admin', adminSchema);
  
  export default Admin;