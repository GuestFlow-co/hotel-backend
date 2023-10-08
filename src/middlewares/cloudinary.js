const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'deq3yungr', 
  api_key: '296892349713731', 
  api_secret: 'PK4MozYb1vqp83_2z0XnuK5dzAs' 
});

module.exports = cloudinary;
