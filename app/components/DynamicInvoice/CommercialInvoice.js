// '''''''''''''''''''''''*
/*
  This is an example app without redux implementation, may little bit messy.
  If your prefer use redux architecture you can change it.
  And We recommend to following this app pattern of redux.
*/
// '''''''''''''''''''''''*
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'dan-styles/vendors/invoice/style.css';
import { getDate } from '../../redux/helpers/dateTimeHelper';

const styles = {
  whitePaper: {
    background: '#FFF',
    color: '#000',
    minWidth: 800,
    border: '1px solid #dedede'
  }
};

const newDataTemplate = (id) => ({
  id,
  item: 'Item_' + id,
  desc: 'Description',
  price: 0,
  qty: 0,
});

class CommercialInvoice extends React.Component {
  state = {
    header: 'INVOICE',
    address: `Chris Coyier
123 Appleseed Street
Appleville, WI 53719

Phone: (555) 555-5555
    `,
    title: `Widget Corp.
c/o Steve Widget
    `,
    number: '123456',
    date: getDate(),
    paid: 0,
    note: 'NET 30 Days. Finance Charge of 1.5% will be made on unpaid balances after 30 days.',
    dataTable: [
      {
        id: '1',
        item: 'Web Updates',
        desc: 'Monthly web updates for http://uxmaestro.com (Nov. 1 - Nov. 30, 2018)',
        price: 650,
        qty: 1,
      },
      {
        id: '2',
        item: 'SSL Renewals',
        desc: 'Yearly renewals of SSL certificates on main domain and several subdomains',
        price: 75,
        qty: 3,
      },
    ],
    total: 0,
  };

  componentDidMount() {
    this.setTotal();
  }

  setTotal() {
    let t = 0;
    const { dataTable } = this.state;
    for (let i = 0; i < dataTable.length; i += 1) {
      t += (dataTable[i].price * dataTable[i].qty);
    }
    this.setState({ total: t });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeTable = (name, id) => event => {
    this.updateItem(id, { [name]: event.target.value });
  };

  handleChangePrice = (name, id) => event => {
    this.updateItem(id, { [name]: event.target.value });
    setTimeout(() => {
      this.setTotal();
    });
  };

  updateItem(id, itemAttributes) {
    const { dataTable } = this.state;
    const index = dataTable.findIndex(x => x.id === id);
    if (index === -1) {
      console.error('Something wen\'t wrong');
    } else {
      this.setState({
        dataTable: [
          ...dataTable.slice(0, index),
          Object.assign({}, dataTable[index], itemAttributes),
          ...dataTable.slice(index + 1)
        ]
      });
    }
  }

  handleAddRow() {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const { dataTable } = this.state;
    this.setState({
      dataTable: [...dataTable, newDataTemplate(id)]
    });
  }

  handleRemoveRow(target) {
    const { dataTable } = this.state;
    const array = [...dataTable];
    const index = array.indexOf(target);
    array.splice(index, 1);
    this.setState({ dataTable: array });
    // re-calculate total
    setTimeout(() => {
      this.setTotal();
    });
  }

  render() {
    const { classes } = this.props;
    const {
      dataTable,
      total,
      header,
      address,
      number,
      date,
      paid,
      title,
      note
    } = this.state;
    const getRow = dataArray => dataArray.map((data, index) => (
      <tr className="item-row" key={index.toString()}>
        <td className="item-name">
          <div className="delete-wpr">
            <textarea value={data.item} onChange={this.handleChangeTable('item', data.id)} />
            <a className="delete" onClick={() => this.handleRemoveRow(data)} href="javascript:;" title="Remove row">X</a>
          </div>
        </td>
        <td className="description">
          <textarea value={data.desc} onChange={this.handleChangeTable('desc', data.id)} />
        </td>
        <td>
          <textarea value={data.price} onChange={this.handleChangePrice('price', data.id)} />
        </td>
        <td>
          <textarea value={data.qty} onChange={this.handleChangePrice('qty', data.id)} />
        </td>
        <td>
          <span className="price">
            { data.qty * data.price }
          </span>
        </td>
      </tr>
    ));

    return (
      <div className={classes.whitePaper}>
        <div id="page-wrap">
          <textarea id="header" value={header} onChange={this.handleChange('header')} />
          <div id="identity">
            <textarea id="address" value={address} onChange={this.handleChange('address')} />
            <div id="logo">
              <img id="image" src="/images/print_logo.jpg" alt="logo" />
            </div>

          </div>

          <div style={{ clear: 'both' }} />

          <div id="customer">
            <textarea id="customer-title" onChange={this.handleChange('title')} value={title} />
            <table id="meta">
              <tbody>
                <tr>
                  <td className="meta-head">Invoice #</td>
                  <td><textarea onChange={this.handleChange('number')} value={number} /></td>
                </tr>
                <tr>
                  <td className="meta-head">Date</td>
                  <td><textarea onChange={this.handleChange('date')} value={date} /></td>
                </tr>
                <tr>
                  <td className="meta-head">Amount Due</td>
                  <td>
                    <div className="due">
                      $
                      {total - paid}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

          <table id="items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              { getRow(dataTable) }
              <tr id="hiderow">
                <td colSpan="5"><a id="addrow" onClick={() => this.handleAddRow()} href="javascript:;" title="Add a row">[+] Add a row</a></td>
              </tr>

              <tr>
                <td colSpan="2" className="blank">&nbsp;</td>
                <td colSpan="2" className="total-line">Subtotal</td>
                <td className="total-value">
                  <div id="subtotal">
                    $
                    {total}
                    .00
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan="2" className="blank">&nbsp;</td>
                <td colSpan="2" className="total-line">Total</td>
                <td className="total-value">
                  <div id="total">
                    $
                    {total}
                    .00
                  </div>
                </td>
              </tr>

              <tr>
                <td colSpan="2" className="blank">&nbsp;</td>
                <td colSpan="2" className="total-line">Amount Paid</td>
                <td className="total-value"><textarea onChange={this.handleChange('paid')} value={paid} /></td>
              </tr>

              <tr>
                <td colSpan="2" className="blank-last">&nbsp;</td>
                <td colSpan="2" className="total-line balance">Balance Due</td>
                <td className="total-value balance">
                  <div className="due">
                    $
                    {total - paid}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div id="terms">
            <h5>Terms</h5>
            <textarea onChange={this.handleChange('note')} value={note} />
          </div>
        </div>
      </div>
    );
  }
}

CommercialInvoice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommercialInvoice);
