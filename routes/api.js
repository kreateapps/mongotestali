var express = require('express')
const jwt = require('jsonwebtoken')
var router = express.Router()
    //اعدادات المنكوديبي و api كله
var mongoose = require('mongoose');
const User = require('../models/users')
const Items = require('../models/additems')
const Types = require('../models/gettypes')
const Zonez = require('../models/getzonz')
const addzone = require('../models/addMzone')
const addFMZ = require('../models/addFMZ')
const addSUBzone = require('../models/addSUBzone')
const addtypeofline = require('../models/addtypeofline')
const addcrean = require('../models/addcrean')
const Reports = require('../models/report')
const Addcreantype = require('../models/addcreantype')
const Addhavycarstype = require('../models/addhavycarstype')
const addhavecar = require('../models/addhavecar')
const addplayersids = require('../models/addpayerid')
var Filter = require('bad-words')
filter = new Filter();


mongoose.connect('mongodb://a:a@ds161539.mlab.com:61539/a');
const app = express()

// //دالة التاكد من ان التوكن الي تم ارساله خلال الصفحة الي تم اختيارها صحيح ومسجل
// function vtokem(req,res,next){
//   if(!req.headers.authorization){
//     return res.status(401).send('n')
//   }
//   let token = req.headers.authorization.split(' ')[1]
//   if(token ==='null'){
//     return res.status(401).send('a')
//   }
//   let payload=jwt.verify(token,'secritkey')
//   if(!payload){
//     return res.status(401).send('m')
//   }
//   req._id=payload.subject
//   next();
// }


// router.post('/add',(req,res)=>{
//   let userDate =req.body;
//   let item = new Items(userDate)
//   item.save((err,itemee)=>{
//     res.status(200).send(itemee)
//   })

// })

//اضافة خطوط النقل
router.post('/reviews', function(req, res) {
    Items.create({
        phonenumofuser: req.body.phonenumofuser,
        carname: filter.clean(req.body.carname),
        cbody: filter.clean(req.body.cbody),
        zonetabel: {
            masterzone: req.body.masterzone,
            FMZ: req.body.FMZ,
            subzone: req.body.subzone
        },
        fromto: {
            tomainzone: req.body.tomainzone,
            TMZ: req.body.TMZ,
            tosubzone: req.body.tosubzone
        },
        fromtime: req.body.fromtime,
        totime: req.body.totime,
        phonenum: req.body.phonenum,
        carditels: req.body.carditels,
        cartype: req.body.cartype,
        age: req.body.age,
        gender: req.body.gender,
        status: req.body.status,
        createdetaandtime: req.body.createdetaandtime,
        viewsconts: req.body.viewsconts

    }, function(err, review) {
        if (err)
            res.send(err);
        addplayersids.find({}, { "idplayer": 1, "_id": 0 }, function(err, review) {
            if (err)
                res.send(err)
            let array = review.map(item => item.idplayer);
            console.log(array);

            var message = {
                app_id: "948bb9b5-85ea-4d9e-8c5c-3fa58274fdc5",
                contents: { "en": "تم اضافة خط جديد" },
                include_player_ids: array
            };

            sendNotification(message);
        });
        Items.find(function(err, review) {
            if (err)
                res.send(err)
            res.json(review);
        });
    });
});

// //اضافة منطقة
// router.post('/zonz', function(req, res) {   

//     Zonez.create({


//             masterzone:  req.body.masterzone,
//             FMZ:  req.body.FMZ,
//             subzone:  req.body.subzone

//     }, function(err, review) {
//         if (err)
//             res.send(err);
//             Zonez.find(function(err, review) {
//             if (err)
//                 res.send(err)
//             res.json(review);
//         });
//     });

//   });

//اضافة كرين
router.post('/addcrean', function(req, res) {

    addcrean.create({

        drivername: filter.clean(req.body.drivername),
        driverphonenum: req.body.driverphonenum,
        wight: req.body.wight,
        cartype: req.body.cartype,
        location: req.body.location,
        createdtime: req.body.createdtime,
        viewsconts: req.body.viewsconts
    }, function(err, review) {
        if (err)
            res.send(err);
        addplayersids.find({}, { "idplayer": 1, "_id": 0 }, function(err, review) {
            if (err)
                res.send(err)
            let array = review.map(item => item.idplayer);
            console.log(array);

            var message = {
                app_id: "948bb9b5-85ea-4d9e-8c5c-3fa58274fdc5",
                contents: { "en": "تم اضافة كرين جديد" },
                include_player_ids: array
            };

            sendNotification(message);
        });
        Zonez.find(function(err, review) {
            if (err)
                res.send(err)
            res.json(review);
        });
    });
});


//اضافة نوع الخط
router.post('/adDtypeofline12', function(req, res) {

    addtypeofline.create({

        linetype: req.body.linetype


    }, function(err, review) {
        if (err)
            res.send(err);

    });

});


//الحصول على بيانات نوع الخط
router.get('/GeTtypeofline1', function(req, res) {
    addtypeofline.find({}, null, { sort: { createdetaandtime: 1 } }, function(err, getit3) {
        if (err)
            res.send(err)
        res.json(getit3);
    });
});


// نوع الكرين
router.get('/Addcreantype', function(req, res) {
    Addcreantype.find(function(err, getit497) {
        if (err)
            res.send(err)
        res.json(getit497);
    });
});

// نوع الكرين
router.get('/Addhavycarstype', function(req, res) {
    Addhavycarstype.find(function(err, getit47) {
        if (err)
            res.send(err)
        res.json(getit47);
    });
});

//الحصول على بيانات نوع الخط
router.get('/GeTtypeofline1', function(req, res) {
    addtypeofline.find(function(err, getit37) {
        if (err)
            res.send(err)
        res.json(getit37);
    });
});


// نوع  بحثالكرين
router.post('/Addcreantype3', function(req, res) {
    addcrean.find({ cartype: req.body.cartype }, function(err, getit490) {
        if (err)
            res.send(err)
        res.json(getit490);
    });
});


// نوع سيارت بحث الحمل
router.post('/Addhavycarstype3', function(req, res) {
    addhavecar.find({ cartype: req.body.cartype }, function(err, getit5) {
        if (err)
            res.send(err)
        res.json(getit5);
    });
});


// نوع الكرين
router.post('/Addcreantype', function(req, res) {

    Addcreantype.create({
        creantype: req.body.creantype
    }, function(err, review) {
        if (err)
            res.send(err);
    });
});



// نوع سيارت الحمل
router.post('/Addhavycarstype', function(req, res) {

    Addhavycarstype.create({
        havycarstype: req.body.havycarstype
    }, function(err, review) {
        if (err)
            res.send(err);
    });
});


//اضافةتقرير اسائة
router.post('/sendreport', function(req, res) {

    Reports.create({

        id: filter.clean(req.body.id),
        data12: req.body.data12,
        phone: req.body.phone,

    }, function(err, review) {
        if (err)
            res.send(err);
        Reports.find(function(err, review) {
            if (err)
                res.send(err)
            res.json(review);
        });
    });

});

//اضافة سيارات ثقيلة
router.post('/addhavecar', function(req, res) {

    addhavecar.create({

        drivername: filter.clean(req.body.drivername),
        driverphonenum: req.body.driverphonenum,
        wight: req.body.wight,
        cartype: req.body.cartype,
        location: req.body.location,
        createdtime: req.body.createdtime,
        viewsconts: req.body.viewsconts
    }, function(err, review) {
        if (err)
            res.send(err);
        addplayersids.find({}, { "idplayer": 1, "_id": 0 }, function(err, review) {
            if (err)
                res.send(err)
            let array = review.map(item => item.idplayer);
            console.log(array);

            var message = {
                app_id: "948bb9b5-85ea-4d9e-8c5c-3fa58274fdc5",
                contents: { "en": "تم اضافة سيارة حمل جديدة" },
                include_player_ids: array
            };

            sendNotification(message);
        });
        Zonez.find(function(err, review) {
            if (err)
                res.send(err)
            res.json(review);
        });
    });

});


//addzoneaddzoneaddzoneaddzoneaddzoneaddzoneaddzoneaddzoneaddzoneaddzoneaddzoneaddzoneaddzoneaddzoneaddzoneaddzoneaddzoneaddzonea
//اضافة مدينة
router.post('/addMzone', function(req, res) {
    addzone.create({
        masterzone: req.body.masterzone,
    }, function(err, review) {
        if (err)
            res.send(err);
        Zonez.find(function(err, review) {
            if (err)
                res.send(err)
            res.json(review);
        });
    });

});

//addFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZaddFMZ
//اضافة اقضية

router.post('/addFMZ', function(req, res) {
    addzone.findOne({ masterzone: req.body.masterzone }, (err, review) => {
        if (err) {
            console.log(err);
        } else {
            if (!review) {
                res.status(401).send('invalid')
            } else {
                addFMZ.create({

                    masterzone: req.body.masterzone,
                    FMZ: req.body.FMZ

                }, function(err, review) {
                    if (err)
                        res.send(err);
                    Zonez.find(function(err, review) {
                        if (err)
                            res.send(err)
                        res.json(review);
                    });
                });
            }
        }
    })
});

//addSUBzoneaddSUBzoneaddSUBzoneaddSUBzoneaddSUBzoneaddSUBzoneaddSUBzoneaddSUBzoneaddSUBzoneaddSUBzoneaddSUBzoneaddSUBzone
//اضافة منطقة

router.post('/addSUBzone', function(req, res) {
    addzone.findOne({ masterzone: req.body.masterzone }, (err, review) => {
        if (err) {
            console.log(err);
        } else {
            if (!review) {
                res.status(401).send('invalid')
            } else {
                addFMZ.findOne({ FMZ: req.body.FMZ }, (err, review) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (!review) {
                            res.status(401).send('invalid')
                        } else {
                            addSUBzone.create({
                                masterzone: req.body.masterzone,
                                FMZ: req.body.FMZ,
                                subzone: req.body.subzone
                            }, function(err, review) {
                                if (err)
                                    res.send(err);
                                Zonez.find(function(err, review) {
                                    if (err)
                                        res.send(err)
                                    res.json(review);
                                });
                            });
                        }
                    }
                })
            }
        }
    })
});

//عرض المدن
router.get('/zonz', function(req, res) {
    addzone.find(function(err, review) {
        if (err)
            res.send(err)
        res.json(review);
    });
});

//عرض الاقضية في المدينة
router.post('/zonzz', function(req, res) {
    let n = req.body.masterzone;
    addFMZ.find({ masterzone: n }, function(err, review) {
        if (err)
            res.send(err)
        res.json(review);
    });
});

//عرض المناطق في القضاء

router.post('/zonzzz', function(req, res) {
    let mc = req.body.masterzone;
    var n = []
    n = req.body.FMZ;

    addSUBzone.find({ masterzone: mc, FMZ: n }, function(err, review) {

        if (err)
            res.send(err)

        res.json(review);
    });

});

//نوع المركبة
router.post('/types', function(req, res) {
    Types.create({
        cartype: req.body.cartype,
    }, function(err, review) {
        if (err)
            res.send(err);

    });

});

router.post('/notyfy', function(req, res) {
    addplayersids.create({
        idplayer: req.body.idplayer,
    }, function(err, review) {
        if (err)
            res.send(err);

    });

});

router.get('/notyfy', function(req, res) {
    addplayersids.find({}, { "idplayer": 1, "_id": 0 }, function(err, review) {
        if (err)
            res.send(err)



        res.json(review);
    });
});

function notyfyit(params) {

}

//عرض نوع المركبة
router.get('/types', function(req, res) {
    Types.find(function(err, review) {
        if (err)
            res.send(err)
        res.json(review);


    });
});

//عرض جميع خطوط النقل
router.get('/get', function(req, res) {
    Items.find({}, null, { sort: { createdetaandtime: -1 } }, function(err, review) {
        if (err)
            res.send(err)
        res.json(review);
    });
});


//حذف 
router.post('/deleteits', function(req, res) {
    Items.findOneAndRemove({ _id: req.body.id }, function(err, review) {
        if (err)
            res.send(err)
        res.json(review);
    });
});


//سحب بيانات المسجل حسب الرقم
router.post('/myadslines', function(req, res) {
    let userDate = req.body;
    User.findOne({ phonenum: userDate.phonenum }, (err, User) => {
        if (err) {
            console.log(err);
        } else {
            if (!User) {
                res.status(401).send('invalid')
            } else {
                if (User.password !== userDate.password) {
                    res.status(401).send('invalid')
                } else {
                    Items.find({ phonenumofuser: req.body.phonenum }, function(err, review) {
                        if (err)
                            res.send(err)
                        res.json(review);
                    });
                }
            }
        }
    })

});


//عرض الكرين
router.get('/getcreans', function(req, res) {

    addcrean.find({}, null, { sort: { createdetaandtime: -1 } }, function(err, addcrean1) {
        if (err)
            res.send(err)
        res.json(addcrean1);
    });
});

//عرض سيارات الحمل
router.get('/gethavycars', function(req, res) {

    addhavecar.find({}, null, { sort: { createdetaandtime: -1 } }, function(err, addhavecar1) {
        if (err)
            res.send(err)
        res.json(addhavecar1);
    });
});

//اضافة مشاهدات
router.post('/addviews', function(req, res) {
    let query = { _id: req.body.id }


    Items.findOneAndUpdate(query, { $inc: { viewsconts: 1 } }, function(err, addhavecar1) {
        if (err)
            res.send(err)

        res.json(addhavecar1);
    });
});

router.post('/addviewscreans', function(req, res) {
    let query = { _id: req.body.id }


    addcrean.findOneAndUpdate(query, { $inc: { viewsconts: 1 } }, function(err, addhavecar1) {
        if (err)
            res.send(err)

        res.json(addhavecar1);
    });
});

router.post('/addviewshavycars', function(req, res) {
    let query = { _id: req.body.id }


    addhavecar.findOneAndUpdate(query, { $inc: { viewsconts: 1 } }, function(err, addhavecar1) {
        if (err)
            res.send(err)

        res.json(addhavecar1);
    });
});

//خطوط نقل بحث متقدم
router.post('/searchadvince', function(req, res) {
    let type = []
    type = req.body.type
    let line = []
    line = req.body.line
    gender = req.body.gender
    upper = req.body.upper
    lower = req.body.lower
        //if(type==null||line==null||gender==null){

    //Items.find(  { cartype: type ,carditels: line,status: { $gt: lower, $lt: upper }},function(err, getitall1) {
    Items.find({ $or: [{ cartype: type }, { carditels: line }, { status: { $gt: lower, $lt: upper } }] }, function(err, getitall1) {
        if (err)
            res.send(err)
        res.json(getitall1);
    });
    //}else{
    //     Items.find( {$or:[  { cartype: type },{carditels: line},{status: { $gt: lower, $lt: upper }} ]},function(err, getitall1) {
    //         if (err)
    //             res.send(err)
    //         res.json(getitall1);
    // });
    //}


});





// //مسار الرجستريشن حتى يسجل الشخص
router.post('/reg', (req, res) => {
    //     let payload={subject : reg._id}
    //     let token =jwt.sign(payload,'secritkey')
    let userDate = req.body;
    let user = new User(userDate)
    user.save((err, reg) => {
        //     let payload={subject : reg._id}
        //     let token =jwt.sign(payload,'secritkey')
        res.status(200).send('ok')
    })
})

//   //داله الدخول مع التوكن
router.post('/log', (req, res) => {
        let userDate = req.body;
        User.findOne({ phonenum: userDate.phonenum }, (err, User) => {
            if (err) {
                console.log(err);
            } else {
                if (!User) {
                    res.status(401).send('invalid')
                } else {
                    if (User.password !== userDate.password) {
                        res.status(401).send('invalid')
                    } else {
                        //  let payload={subject : User._id}
                        //  let token =jwt.sign(payload,'secritkey')
                        res.status(200).send('ok')
                    }
                }
            }
        })
    })
    //حذف النوتفكيشن
router.post('/dellnotyfy', function(req, res) {
    addplayersids.findOneAndRemove({ idplayer: req.body.idplayer }, function(err, review) {
        if (err)
            res.send(err)
        res.json(review);
    });
});







var sendNotification = function(data) {
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj"
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    var https = require('https');
    var req = https.request(options, function(res) {
        res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};



















module.exports = router;