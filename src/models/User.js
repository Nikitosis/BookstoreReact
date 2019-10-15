export default class User{
    constructor(id,username,fName,lName,roles,country,city,gender,phone,email,avatarLink,money,emailVerified){
        this.id=id;
        this.username=username;
        this.fName=fName;
        this.lName=lName;
        this.roles=roles;
        this.country=country;
        this.city=city;
        this.gender=gender;
        this.phone=phone;
        this.email=email;
        this.avatarLink=avatarLink;
        this.money=money;
        this.emailVerified=emailVerified;
    }
}