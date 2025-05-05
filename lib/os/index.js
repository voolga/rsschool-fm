import os from 'os';

export const handleOsCommand = (flag) => {
  switch (flag) {
    case '--EOL': {
      const eol = JSON.stringify(os.EOL);
      console.log(`Default EOL: ${eol}`);
      break;
    }

    case '--cpus': {
      const cpus = os.cpus();
      console.log(`Total CPUs: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        const model = cpu.model.trim();
        const speedGHz = (cpu.speed / 1000).toFixed(2);
        console.log(`CPU ${index + 1}: ${model}, ${speedGHz} GHz`);
      });
      break;
    }

    case '--homedir': {
      console.log(os.homedir());
      break;
    }

    case '--username': {
      console.log(os.userInfo().username);
      break;
    }

    case '--architecture': {
      console.log(os.arch());
      break;
    }

    default:
      console.log('Invalid input');
  }
};