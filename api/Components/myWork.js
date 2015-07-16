/**
 * Created by Moon on 04.07.2015.
 */


var React = require('react');


var DataGrid = require('react-datagrid');







var columns = [

  { name: 'username' },
  { name: 'email'  }



];





var UpPanel = React.createClass({



  render: function () {


    return (






  <div className="btn-group">



    <button type="button" className="btn green btn-lg">Входящие</button>


    <button type="button" className="btn blue btn-lg">Исходящие</button>






    <button type="button" className="btn red btn-lg">Просроченные</button>





  </div>









    );


  }








});
















var MyWork = React.createClass({


  onColumnResize: function(firstCol, firstSize, secondCol, secondSize){
    firstCol.width = firstSize
    this.setState({})
  },



  handleColumnOrderChange: function (index, dropIndex){
    var col = columns[index];
    columns.splice(index, 1); //delete from index, 1 item
    columns.splice(dropIndex, 0, col);
    this.setState({});
  },



  getInitialState: function() {
    return {data: []};
  },




  componentDidMount: function() {
    $.ajax({
      url: '/gettable',

      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/emp', status, err.toString());
      }.bind(this)
    });
  },




    render: function () {


    return (


      <div>

      <UpPanel/>


        <div className="clearfix margin-bottom-10">
        </div>


        <DataGrid
        ref="dataGrid"
        idProperty='id'
        dataSource={this.state.data}
        columns={columns}
        style={{height: 500}}
        onColumnOrderChange={this.handleColumnOrderChange}
        onColumnResize={this.onColumnResize}


        //if you don't want to show a column menu to show/hide columns, use
        //withColumnMenu={false}
        />


      </div>

    );


}


});

module.exports = MyWork;
