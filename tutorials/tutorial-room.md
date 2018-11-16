## Create your room by subclassing a Room

```
import { Room } from 'rpgbaker'

export default class RoomMenu extends Room {
Init () {
console.log('RoomMenu Init')
super.Init()
}

Update (delta) {
super.Update(delta)
}
}
```

## Add your new Room to your Game

```
import { Game } from 'rpgbaker'
import RoomMenu from './rooms/room_menu'

let myGame = new Game(800, 600)

myGame.AddRoom('MenuRoom', new RoomMenu())
myGame.Init()
myGame.RoomGoto('MainRoom')
```
