export default class SchedulerDTO {
  constructor(name, description) {
    this.name = name
    this.description = description
    this.status = 'stop'
    this.lastExecutionTime = null
  }
}
