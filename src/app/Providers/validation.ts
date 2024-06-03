
import { Injectable } from '@angular/core';
import { AlertService } from '../alert-info/alert-service.service';
//import { AlertService } from 'src/app/Shared/alert-info/alert-service.service';

/*
  Generated class for the ValidationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root'
})
export class ValidationProvider {

  constructor(private alertservice: AlertService) {
  }


  ValidateEmail(mail,alt) 
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
    else{
     if(alt)
     {
      this.alertservice.Alert('You have entered an invalid email address!', 2, null, null);
      return (false)
     }
     else
     {
      return (false)
     }
      
    }
   
  }
  ValidateMobile(mobile,alt) 
  {
   if (/^(\+[\d]{1,5}|0)?[6-9]\d{9}$/.test(mobile))
    {
      return (true)
    }
    else{
     if(alt)
     {
      this.alertservice.Alert('You have entered an invalid mobile number!', 2, null, null);
      return (false)
     }
     else
     {
      return (false)
     }
     
      
    }
      
    
  }
  ValidatePassword(name,alt) 
  {
   if (name.length>0&&name.length>6)
    {
      return (true)
    }
    else{ 
      alert("Please Enter Valid Password");}
      return (false)
  }

  ValidatePincode(pincode,alt) 
  {
   if (pincode>0&&pincode==6)
    {
      return (true)
    }
    else{ alert("Please Enter Valid Password");}
      return (false)
  }
  ValidateUserName(name,alt) 
  {
   if (name.length>0)
    {
      return (true)
    }
    else{ 
      
      this.alertservice.Alert('Please Enter Name', 2, null, null);
    }
      return (false)
  }
  ValidateRequired(name,alt) 
  {
   if (name.length>0)
    {
      return (true)
    }
    if(alt==true){ 
      
      this.alertservice.Alert('Username must be at least 5 characters long', 2, null, null);
    }
      return (false)
  }

  ValidateAddress(name,alt) 
  {
   if (name.length>1)
    {
      return (true)
    }
    if(alt==true){ 
      this.alertservice.Alert('Please enter address', 2, null, null);
     
    }
      return (false)
  }
  ValidateRequiredInt(name,alt) 
  {
   if (name>0)
    {
      return (true)
    }
    if(alt==true){ alert("Please select valid id");}
      return (false)
  }

  ValidateCode(name,alt) 
  {
   if (name.length>=12)
    {
      return (true)
    }
    if(alt==true)
    { 
      alert("Code must be at least 14 characters long");
    }
      return (false)
  }

  ValidateName(name,alt)
  {
        if (name.length>0)
         {
           return (true)
         }
       else{ alert("Enter mandatory fields");}
       return (false)
  }

  ValidateValues(data:string,fieldName,alt) 
  {
   if (data.toString().trim().length>0)
    {
      return (true)
    }
    else{
     
      this.alertservice.Alert('Please enter '+fieldName, 2, null, null);
      
    }
      
      return (false)
  }

  ValidateIntegerValues(data,fieldName,alt) 
  {
   if (data>0)
    {
      return (true)
    }
    else{
     
      this.alertservice.Alert('Please Select '+fieldName, 2, null, null);
      
    }
      
      return (false)
  }


  IsEmail(mail) 
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return (true)
    }
    else{   
      return (false)
    }
   
  }
  IsMobile(mobile) 
  {
   if (/^(\+[\d]{1,5}|0)?[6-9]\d{9}$/.test(mobile))
    {
      return (true)
    }
    else{
     
      return (false)
      
    }
      
     
  }

}
