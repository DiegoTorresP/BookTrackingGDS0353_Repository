const multer= require("multer");
const FirebaseStorage = require('multer-firebase-storage');
const upload = multer({
  storage: FirebaseStorage({
    bucketName: 'gs://biblioteca-d30f7.appspot.com',
    credentials: {
      clientEmail: 'firebase-adminsdk-n5ot7@biblioteca-d30f7.iam.gserviceaccount.com',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDe4FXKFbjeFQ08\n45JMWM/vnZxfsuRlDHJKVSv9c5Jx7E1Olek9ST0d5XApWr7d50hxB20fAmBxDfTv\nwXDTC8spKmH8sEm+ipgV8rypcJk9xeSc8UzMdHwfpOuSG6ukLyeaKiBVZgN3ano3\nwe+E6pjmgA6wIXIj1EbKK4PyZiiffAI8qMp37nV5rD7Z84e865olnPENQZZ2qsi7\nEULRdPqrXGZit9oPwjn6RAquSPsDnRwN3x7WLBw9vfNg4NvwZlkTkGmswu7N+cQJ\nGy8urIUNVs8r3t3NJboUxljPJEeaV/JyCevgBNrTfZUgz9uyM/T+gEYAOfAvG9H4\nz/ursQNJAgMBAAECggEADq8YEormKwJBui/CJ/Piq0ZRPardylyMu8yrFnVCrO0l\nK2whZE91eTPwdQEMueEEOvzYGdFrGje8Wf7ULfYadK6yqwElsqnomurrDCd7foA8\nb4H5uIS6LXmM/bYt/lC5sA9eIaeUII4sLuKWTcWzvN1WBREHDJ5D6wun6KoGEM/C\nwyYK9e8ArldiWcAMmnqgJGWOMhki32a5FeRykLptWBzUU8NCo6SNJjAkgAHGyRxa\ndnvRo9/OMzvbSbboi5Ww9YbL+etzW/78f2da0T8c7PnUBJH04+cqbwVMvhuExXyX\n+2l5FYF2fueh11s0Sjo3GWU6Y7lDnmPoREzqvz4z4wKBgQD8jaVgWm6uL7HgrbI+\nm9lBJxqAVvrBDgFnQLfDAcRC2RnrfcwI2wr6wVZoh3xgbZ/kJ99EpgZrEwWCg2aY\noKUsuwY/PecrbEOfl3OHbDdZnlH8PKW8UsU/5W3PWClXUXgDPWcDta2z8BFkG+BB\nSz/fscD1rFMrpkoyl9iVLjhlIwKBgQDh6wFuhhZL6vapKl0cWryFBlqF/17HOgZy\nDV/djnkNID57Sz0oW0qw9six8XZXPYMHfR7Ir7XymY7Rl0cUxSSE66uBeekJiyJO\nPUWeI460ACczutK2HS5eNZE2JkM1jbyt1tL1+yI8hFXTL2x3i1Y6BdQCLYXAKF0t\n92Q2bUnKowKBgBsx4XnzovFsv1mzOntVatqCLG9fblb1fB8zL9Z2zTxphkn+XMcj\nVxZTVUuiMzlq9Imr5XXN7uj+vlwkbBrJSZ/8b5rFvqvFV67Kry0I8RjcXHWtzibu\nPsE3olBubN0zL5ohtYMHwDGdCzJdchN11+XtjRqnOLl9iYXTJgZCWN5DAoGBAKk5\nwtnKYPs/JsLys8pggWRXrQlAj/tGELvwHsY0SaK2a3cplcccEyfZw93e1Flm/zZl\n1+BWFkGCGwQOgDUjs0ZJzi9vZUs7yFe49+QMGIHmt3a9U8cMtsXk9EAOizubTyEc\nkOum0S9ppWxK0sH9Qnq2EOgMt2qIEbwz2wIV/TdnAoGBAMiWIE8zPEzbl7/7GxMk\nqqP9zW2Shuk59TNPT+LrjQZ7oQH4OC/xaYAGC0C9Pc6rZcuTebwEcfHD1w0er+47\nmSZvlHRYKrKEyJBCc5H7nkY7Y02PUsbq4upmrEcqAyJ75JnQ4PBr3fIYxuNlwFHJ\nV+kHE0IxvJSIQUi74l5grMlx\n-----END PRIVATE KEY-----\n',
      projectId: 'biblioteca-d30f7'
    },
    public:true,
  })
})

module.exports= upload;