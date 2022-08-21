import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
    firstname: {type: String, default:null},
    lastname: {type: String, default:null},
    email: { type: String, sparse: true, default: null },
    password: { type: String, default: null},
    previous_appartments: [{
        review: {
            landlord: { type:String, default:null },
            environment: { type:String, default:null },
            quality_of_amenities: { type: String, default: null },
            image_or_video_link: { type: String, default: null },
        }
    }],
    review_time: { type: String, default: Date.now() },
    helpful: { type: Number, default: 0 }
})

export default mongoose.model("User", user)