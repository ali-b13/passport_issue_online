
import bcrypt from "bcrypt"
import  mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email:String,
  password:String,
  emailVerified:{
    type:Boolean,
    default:false
  },
  state:String

});



const reviewSchema = new mongoose.Schema({
  userId:{ type: mongoose.Schema.Types.ObjectId,required: true ,ref:"users"},
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'forms', required: true },
  officer: { type: mongoose.Schema.Types.ObjectId, ref: 'officers', },
  status: { type: String, enum: ['تم قبول طلبك','قيد المراجعه' , 'طلبك مرفوض',"ملفات اضافيه مطلوبه"], default: 'قيد المراجعه' },
  comments: { type: String },
  branch:String,
  requiredDocuments:[],
  addedDocuments:[],
  reviewDate: { type: Date, default: Date.now }
});

const applicationFormSchema = new Schema({
  id:Schema.ObjectId,
  user_id:String,
  full_name:String,
  surname :String,
  profession:String,
  palce_of_birth:String,
  date_of_birth:String,
  gender:String,
  address:String,
  status:String,
  type_of_job:String,
  job:String,
  address_of_job:String,
  mobile_number:String,
  mother_full_name:String,
  mother_date_of_birth:String,
  mother_nationality:String,
  mother_file_id:String,
  birth_certificate:String,
  first_witness_file:String,
  second_witness:String,
  school_certificate:String,

  previous_passport_number:String ||null ,
  type_of_previous_passport:String ||null


})

const officerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{ type: String, required: true },
  gender:{ type: String, required: true },
  branch:{type:String,required:true},
  role: { type: String, enum: ['admin', 'officer', 'supervisor'], required: true },
  supervisor: { type: Schema.Types.ObjectId, ref: 'Officer' }, // Reference to supervisor
  subordinates: [{ type: Schema.Types.ObjectId, ref: 'Officer' }],
  contact_number: {
    type: String
  },
  employmentStatus: {
    type: String,
    enum: ['active', 'on_leave', 'terminated'],
    default: 'active'
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
});

const StateSchema=new mongoose.Schema({
  label:String
})




export const User= mongoose.models.user || mongoose.model("user",userSchema)
export const State= mongoose.models.state || mongoose.model("state",StateSchema)
export const Review= mongoose.models.review || mongoose.model("review",reviewSchema)
export const Officer =mongoose.models.officer || mongoose.model('officer', officerSchema)
export const Application= mongoose.models.form || mongoose.model("form",applicationFormSchema)

// module.exports={Officer}