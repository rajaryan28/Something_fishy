const express= require('express')
const router= express.Router()

router.get('/',(req,res)=>{
    obj={
        'name':'anish',
        'Age':true
    }
    res.json(obj)
})

module.exports=router