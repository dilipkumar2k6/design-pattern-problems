class Iterator {
    getNext(){
        throw new Error('Implement me');
    }
    hasMore(){
        throw new Error('Implement me'); 
    }
}
class FacebookFriendsIterator extends Iterator {
    constructor(facebook, profileId){
        super();
        this.currentPosition = 0;
        this.facebook = facebook;
        this.profileId = profileId;
        this.cache = facebook.getSocialGraphRequest(profileId, 'friends');
    }
    getNext(){
        if(this.hasMore()) {
            this.currentPosition++;
            return this.cache[this.currentPosition];
        }        
    }
    hasMore(){
        return  this.currentPosition < this.cache.length;
    }
}

class FacebookCoworkersIterator extends Iterator {
    constructor(facebook, profileId){
        super();
        this.currentPosition = 0;
        this.facebook = facebook;
        this.profileId = profileId;
        this.cache = facebook.getSocialGraphRequest(profileId, 'coworkers');
    }
    getNext(){
        if(this.hasMore()) {
            this.currentPosition++;
            return this.cache[this.currentPosition];
        }        
    }
    hasMore(){
        return  this.currentPosition < this.cache.length;
    }
}

class Facebook  {
    constructor(){

    }
}
class SocialSpammer {
    send(iterator, message) {
        while(iterator.hasMore()) {
            const profile = iterator.getNext();
            console.log('Sending email to profile %d with message %d', profile, message)
        }
    }
}