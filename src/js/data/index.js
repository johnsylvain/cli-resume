import json from './data.json';

let model = {
  keyCommands: [
    { code: 38, shortcut: null, action: 'UP' },
    { code: 40, shortcut: null, action: 'DOWN' },
    // { code: 75, shortcut: 'ctrlKey', action: 'CLEAR' }
  ],
  previousCommands: [
    {
      text: 'type \'help\' to view commands',
      type: 'response',
      _id: 1
    }
  ],
  enteredCommands: {
    data: [],
    currentCommand: '',
    pointer: 0,
  },
  currentOutput: null,
  socialProfiles: [],
  commands: [
    { text: '',	params: null },
    { text: 'help', params: null },
    // { text: 'clear', params: null },
    { text: 'pwd', params: null, ignored: true },
    { text: 'ls', params: null, ignored: true },
    { text: 'email', params: ['<subject>'] },
    { text: 'open', params: ['resume', 'pdf'] },
    { text: 'show', params: ['education', 'skills', 'xp', 'projects'] },
    { text: 'social', params: ['github', 'linkedin'] },
    { text: 'rm', params: ['-rf'], ignored: true }
  ],
  defaultMessage: {
    welcomeMessage: [
      "welcome to my interactive resume!",
      "to view my resume, type 'open resume' in the terminal to the left",
      "type 'help' to view other commands"
    ]
  },
  data: json.resumeData
};

export default model;