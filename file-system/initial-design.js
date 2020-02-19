let globalTab = '';
class File {
    constructor(name){
        this.name = name;
    }
    ls(){
        console.log(globalTab+this.name);
    }
}
class Directory{
    constructor(name){
        this.name = name;
        this.children = [];
    }
    add(child) {
        this.children.push(child);
    }
    ls(){
        console.log(globalTab+ this.name );
        // add tab space after directory
        globalTab+='    ';
        for(const child of this.children) {
            child.ls();
        }
        // restore global tab
        globalTab = globalTab.substring(0, globalTab.length - 4);
    }
}

class SymbolicLink {
    constructor(target){
        this.target = target;
    }
    add(child) {
        this.target.add(child);
    }
    ls(){
        this.target.ls();
    }    
}

const test = ()=>{
    const music = new Directory('MUSIC');
    const scorpions = new Directory('SCORPIONS');
    const dio = new Directory('DIO');
    const track1 = new File("Don't wary, be happy.mp3");
    const track2 = new File("track2.m3u");
    const track3 = new File("Wind of change.mp3");
    const track4 = new File("Big city night.mp3");
    const track5 = new File("Rainbow in the dark.mp3");
    const track6 = new File("Sun rise with smile.mp3");

    music.add(track1);
    music.add(scorpions);
    music.add(track2);
    scorpions.add(track3);
    scorpions.add(track4);
    scorpions.add(dio);
    dio.add(track5);

    const symbolicLink1 = new SymbolicLink(dio);
    symbolicLink1.add(track6);
    const symbolicLink2 = new SymbolicLink(track5);
    music.add(symbolicLink1);
    music.add(symbolicLink2);

    music.ls();
}
test();