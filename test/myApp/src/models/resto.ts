export class Resto {
  Name: string
  Id: string
  Description: string
  Rate: number
  src: string
  Gallery: Array<{
    Id: string
    Id_Resto: string
    PID: string
    Pname: string
    Ptype: string
    Type: string
    file: {
      type: string
      data: Uint8Array
    }
  }>
}