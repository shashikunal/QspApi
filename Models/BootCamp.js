import { Schema, model } from "mongoose";
import slugify from "slugify";
import { geocoder } from "./../uitils/geocoder";
let BootCampSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add Description"],
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use valid url with HTTP or HTTPS",
      ],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please use valid Email format",
      ],
    },
    address: {
      type: String,
      required: [true, "please add address field"],
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        // required: true,
      },
      coordinates: {
        type: [Number],
        // required: true,
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    careers: {
      type: [String],
      required: true,
      enum: [
        "web development",
        "react development",
        "fullstack development",
        "java development",
        "python development",
        "android development",
        "ux/ui development",
        "business",
        "others",
      ],
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating can not be more than 5"],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

BootCampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

BootCampSchema.pre("save", async function (next) {
  let loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipCode: loc[0].zipcode,
    country: loc[0].countryCode,
  };
  this.address = undefined;
  next();
});

export let BootCampModel = model("Bootcamp", BootCampSchema);
