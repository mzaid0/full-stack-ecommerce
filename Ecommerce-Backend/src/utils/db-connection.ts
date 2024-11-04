import mongoose from "mongoose";
// Connect to MongoDB
export const connectDb = (uri:string) => {
  mongoose.connect(uri, {
    dbName: "E-commerceTS",
  }).then(()=>{console.log("Database connected successfully");
  }).catch(()=>{console.log("Failed to connect Database");
  })
};
