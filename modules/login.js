const router = require('express').Router()
const db = require('../config/db')
const requestIp = require('request-ip')
router.route('/login')
      .get(async (req,res)=>{
          let data = await db(true,'truncate users')
          res.json({
              data:data
          })
      })
      .post(async (req,res)=>{
          let {username,password} = req.body
          let data = await db(false,"select * from users")
          let user = data.find(f => f.username==username && f.password==password)
          if(!user){
                let user = await db(false,'insert into users(username,password) values($1,$2) returning *',username,password)
                if(user){
                    res.json({
                        data:user,
                        message:"you registered"
                    })
                }else{
                    res.json({
                        data:null,
                        message:"your registration failed"
                    })
                }
            }else{
                res.json({
                    data:null,
                    message:"this account already exists"
                })
            }
          
      })
router.route('/myip')
      .get(async (req,res)=>{
        let clientIp = requestIp.getClientIp(req);
        let ip = await db(false,'insert into ip(ips) values($1) returning *',clientIp)
        res.json({
            yourIp:ip
        })
      })
module.exports = router