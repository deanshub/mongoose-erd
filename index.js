import fs from 'fs'
import os from 'os'
let mongoose

let relations={}

const getSchemaTitle = (schemaName)=>{
  return `title {label: "${schemaName}", size: "20"}${os.EOL}${os.EOL}`
}
const getModelTitle = (modelName)=>{
  return `[${modelName}] {bgcolor: "#d0e0d0"}${os.EOL}`
}
const getTypeString = (type)=>{
  if (Array.isArray(type)){
    if (!type[0]){
      return 'Undefined'
    }else{
      return getTypeString(type[0])
    }
  }

  switch (type){
    case mongoose.Schema.Types.ObjectId:
      return 'ObjectId'
    case String:
      return 'String'
    case Date:
      return 'Date'
    case Number:
      return 'Number'
    case Boolean:
      return 'Boolean'
    case Buffer:
      return 'Buffer'
    case mongoose.Schema.Types.Mixed:
      return 'Object'
    default:
      return 'Unknown'
  }
}
const getAttributeText = (modelName, model, attr)=>{
  let attrModel = model[attr]
  if (!attrModel){
    attrModel={}
  }
  const {alias,required,unique,index, ref} = attrModel

  const pkText = attr==='_id'?'*':''
  const uniqueText = unique?'+':''

  const aliasText = alias?` (${alias})`:''
  const defaultText = attrModel.default?`, [${attrModel.default}]`:''
  const indexText = index?', Index':''
  const mainText = `${attr} {label: "${attr} ${aliasText}${required?', not null':''}${defaultText}${indexText}"}`

  if (ref){
    if (!relations[modelName]){
      relations[modelName] = []
    }

    if (!relations[modelName].includes(ref)){
      relations[modelName].push(ref)
    }
  }

  return `${pkText}${uniqueText}${mainText}${os.EOL}`
}

const getRelationText = (table1, table2)=>{
  return `${table1} *--* ${table2} {label: "${table1}"}${os.EOL}`
}

const toString = (localMongoose)=>{
  mongoose = localMongoose
  const modelNames = mongoose.modelNames()
  if (!mongoose.models[modelNames[0]]){
    throw new Error('mongoose models not loaded, please load them before using mongoose-erd tool')
  }

  relations = {}
  const dbName = mongoose.models[modelNames[0]].db.name
  let schemaString = getSchemaTitle(dbName)

  schemaString+=`# Entities${os.EOL}`
  modelNames.forEach((modelName)=>{
    const model = mongoose.models[modelName].schema.obj
    const modelTitle = getModelTitle(modelName)
    schemaString+=modelTitle
    const idAttributeText = getAttributeText(modelName, model, '_id')
    schemaString+=idAttributeText
    Object.keys(model).filter(col=>col!=='_id').forEach((attrName)=>{
      const attributeText = getAttributeText(modelName, model, attrName)
      schemaString+=attributeText
    })
    schemaString+=os.EOL
  })

  schemaString+=`# Relationships${os.EOL}`
  Object.keys(relations).forEach(table1=>{
    relations[table1].forEach(table2=>{
      const relationText = getRelationText(table1, table2)
      schemaString+=relationText
    })
  })

  return schemaString
}
export default {
  toString,
  toFile(localMongoose, filePath='schema.er'){
    return new Promise((resolve,reject)=>{
      fs.writeFile(filePath, toString(localMongoose),(err)=>{
        if (err){
          reject(err)
        }else{
          resolve(filePath)
        }
      })
    })
  }
}
