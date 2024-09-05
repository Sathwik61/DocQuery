const fs= require('fs')
const path= require('path')
const pdf=require('pdf-parse')

const PdfContentExtract= async (pdfPath)=>{
    try{

        const dataBuffer=fs.readFileSync(pdfPath)
        const data=await pdf(dataBuffer);
        return data.text;
    }
    catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw error;
    }
}

module.exports=PdfContentExtract;