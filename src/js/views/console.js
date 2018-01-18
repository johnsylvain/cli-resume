import controller from '../controller'
import events from '../utils/events'
import { h, render } from '../utils/dom'
import { defer } from '../utils/helpers'

export default class ConsoleView { 
  constructor () {
    this.vdom = null
    this.render()
    this.bindEvents()
  }
  
  bindEvents () {
    const consoleContainer = document.getElementById('console-selector')
 
    consoleContainer.addEventListener('click', (e) => {
      document.getElementById('command-input').focus()
    })

    events.on('consoleViewRender', data => {
      this.render()
    })

    window.addEventListener('keyup', (e) => {
      const availableKeys = controller.getKeyCommands();
      const keyPress = availableKeys.find(key => (key.shortcut)
        ? key.code === e.which && e[key.shortcut]
        : key.code === e.which
      )
  
      if (keyPress && document.activeElement.id === 'command-input') 
        controller.executeKeypress(keyPress.action)
    })
  }

  render () {
    const handleSubmit = e => {
      e.preventDefault();
      controller.enterCommand(e.target.prompt.value);
      e.target.prompt.value = '';
    }

    // Create virtual dom from jsx
    const vnodes = (
      <div>
        <ul className="console__command-list">
          {controller.getPreviousCommands().map(command => 
            <li className={`console__command-list-item console__command-list-item--${command.type}`}> 
              {(command.type === 'command') ? `$ ${command.text}` : command.text}
            </li>
          )}
        </ul>
        <form onSubmit={handleSubmit}>
          <span>$&nbsp;</span>
          <input
            type="text" 
            name="prompt" 
            id="command-input" 
            className="console__prompt" 
            autocomplete="off"
            value={controller.getEnteredCommands().text}
            forceUpdate={true}
          />
        </form>
      </div>
    )
    
    // diff dom and render into container
    this.vdom = render(
      document.getElementById('commands'), // container
      vnodes, 
      this.vdom
    )
    
    // alway focus the input
    document.getElementById('command-input').focus()
  }
}