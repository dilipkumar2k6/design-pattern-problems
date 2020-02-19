class FileSystemReceiver {
  openFile() {}
  closeFile() {}
  writeFile() {}
}

class UnixFileSystemReceiver extends FileSystemReceiver {
  openFile() {
    console.log("Opening file in unix OS");
  }
  closeFile() {
    console.log("Closing file in unix OS");
  }
  writeFile() {
    console.log("Writing file in unix OS");
  }
}

class WindowsFileSystemReceiver extends FileSystemReceiver {
  openFile() {
    console.log("Opening file in Windows OS");
  }
  closeFile() {
    console.log("Closing file in Windows OS");
  }
  writeFile() {
    console.log("Writing file in Windows OS");
  }
}

class Command {
  execute() {}
}
class OpenFileCommand extends Command {
  constructor(fileSystem) {
    super();
    this.fileSystem = fileSystem;
  }
  execute() {
    this.fileSystem.openFile();
  }
}
class CloseFileCommand extends Command {
  constructor(fileSystem) {
    super();
    this.fileSystem = fileSystem;
  }
  execute() {
    this.fileSystem.closeFile();
  }
}

class WriteFileCommand extends Command {
  constructor(fileSystem) {
    super();
    this.fileSystem = fileSystem;
  }
  execute() {
    this.fileSystem.writeFile();
  }
}

class FileInvoker {
  constructor(command) {
    this.command = command;
  }
  execute() {
    this.command.execute();
  }
}

class FileSystemReceiverUtil {
  constructor() {
    this.isWin = process.platform === "win32";
  }
  static getUnderlyingFileSystem() {
    if (this.isWin) {
      return new WindowsFileSystemReceiver();
    }
    return new UnixFileSystemReceiver();
  }
}

const test = () => {
  //Creating the receiver object
  const fs = FileSystemReceiverUtil.getUnderlyingFileSystem();
  //creating command and associating with receiver
  const openFileCommand = new OpenFileCommand(fs);

  //Creating invoker and associating with Command
  let file = new FileInvoker(openFileCommand);
  //perform action on invoker object
  file.execute();

  const writeFileCommand = new WriteFileCommand(fs);
  file = new FileInvoker(writeFileCommand);
  file.execute();

  const closeFileCommand = new CloseFileCommand(fs);
  file = new FileInvoker(closeFileCommand);
  file.execute();
};

test();
