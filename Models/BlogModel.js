const mongoose = require("mongoose");
const validator = require("validator");

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String
        },
        authorName: {
            type: String,
            required: true
        },
        publishDate: {
            type: String
        },
        tags: {
            type: [String],
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        comments: {
            type: Array,
            items: [
                {
                    type: Object,
                    properties: {
                        publicDate: {
                            type: Date,
                            default: Date.now
                        },
                        favourite: {
                            type: Number
                        },
                        shared: {
                            type: Number
                        },
                        content: {
                            type: String
                        },
                        user: {
                            type: Object,
                            properties: {
                                name: {
                                    type: String
                                },
                                avatar: {
                                    type: String
                                }
                            },
                        },
                        replies: {
                            type: Array,
                            items: [
                                {
                                    type: Object,
                                    properties: {
                                        user: {
                                            type: Object,
                                            properties: {
                                                name: {
                                                    type: String
                                                },
                                                avatar: {
                                                    type: String
                                                }
                                            },
                                        },
                                        publicDate: {
                                            type: Date,
                                            default: Date.now
                                        },
                                        favourite: {
                                            type: Number
                                        },
                                        shared: {
                                            type: Number
                                        },
                                        content: {
                                            type: String
                                        }
                                    }
                                }
                            ]
                        }
                    },
                },
            ]
        }
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
