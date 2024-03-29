import React, { Component } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import { FaSave } from 'react-icons/fa'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { FaRegArrowAltCircleRight } from 'react-icons/fa'

class Note extends Component {
    constructor(props){
      super(props)
      this.state = {
        editing: false,
	    moving: false,
      }
      this.index = 0
      this.edit = this.edit.bind(this)
      this.remove = this.remove.bind(this)
      this.moveRight = this.moveRight.bind(this)
      this.moveLeft = this.moveLeft.bind(this)
      this.save = this.save.bind(this)
      this.renderForm = this.renderForm.bind(this)
      this.renderDisplay = this.renderDisplay.bind(this)
      this.randomBetween = this.randomBetween.bind(this)
    }

    static offset = 1;
    componentWillMount(){
      this.style = {
	    left: this.randomBetween(this.index*window.innerWidth/3 + 10, this.index*window.innerWidth/3 + 10, 'px'),
        //top: this.randomBetween(2, window.innerHeight - 150, 'px'),
          top: Note.offset*window.innerHeight/7,
        //transform: `rotate(${this.randomBetween(-20, 20, 'deg')})`
      }
        Note.offset === 6? Note.offset = 1 : Note.offset++;
    }

    randomBetween(x, y, s){
      return x + Math.ceil(Math.random() * (y-x)) + s
    }

    componentDidUpdate(){
      let textArea
      if(this.state.editing){
        textArea = this._newText
        textArea.focus()
        textArea.select()
      }
    }

    shouldComponentUpdate(nextProps, nextState){
      return (
        this.props.children !== nextProps.children || this.state !== nextState
      )
    }

    edit(){
      this.setState({
        editing: true
      })
    }
    remove(){
      this.props.onRemove(this.props.index)
    }
    moveLeft(){
      this.index = (this.index == 0? this.index : this.index - 1)
      this.move()
    }
    moveRight(){
      this.index = (this.index < 3? this.index + 1 : this.index)
      this.move()
    }
    save(e){
      e.preventDefault()
      this.props.onChange(this._newText.value, this.props.index)
      this.setState({
        editing: false,
	moving:false
      })
    }
    move(){
      console.log("moveing item at index", this.index)
      this.style = {
        top: this.style.top,
	left: this.randomBetween(this.index*window.innerWidth/4 + 10, this.index*window.innerWidth/4 + 10, 'px')
      }
      this.setState({
        moving: true
      })
    }

    renderForm(){
      return (
        <div className="note" style={this.style}>
          <form onSubmit={this.save}>
            <textarea ref={input => this._newText = input}
                      defaultValue={this.props.children}/>
            <button id="save"><FaSave /></button>
          </form>
        </div>
      )
    }
    renderDisplay() {
      return (
        <div className="note" style={this.style}>
          <p>{this.props.children}</p>
          <span>
	    <button onClick={this.moveLeft} id="moveLeft"><FaRegArrowAltCircleLeft /></button>
            <button onClick={this.moveRight} id="moveRight"><FaRegArrowAltCircleRight  /></button>
            <button onClick={this.edit} id="edit"><FaPencilAlt /></button>
            <button onClick={this.remove} id="remove"><FaTrash /></button>
          </span>
        </div>
      )
    }

    render() {
      return this.state.editing ? this.renderForm() : this.renderDisplay()      
    }
}

export default Note