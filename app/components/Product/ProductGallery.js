import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ProductCard from '../CardPaper/ProductCard';
import ProductDetail from './ProductDetail';

class ProductGallery extends React.Component {
  state = {
    open: false,
  }

  handleDetailOpen = (product) => {
    const { showDetail } = this.props;
    this.setState({ open: true });
    showDetail(product);
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { open } = this.state;
    const {
      dataProduct,
      handleAddToCart,
      productIndex,
      keyword,
      listView
    } = this.props;

    return (
      <div>
        <ProductDetail
          open={open}
          close={this.handleClose}
          detailContent={dataProduct}
          productIndex={productIndex}
          handleAddToCart={handleAddToCart}
        />
        <Grid
          container
          alignItems="flex-start"
          justify="flex-start"
          direction="row"
          spacing={3}
        >
          {
            dataProduct.map((product, index) => {
              if (product.get('name').toLowerCase().indexOf(keyword) === -1) {
                return false;
              }
              const itemAttr = {
                id: product.get('id'),
                name: product.get('name'),
                thumbnail: product.get('thumbnail'),
                price: product.get('price'),
                quantity: 1
              };
              return (
                <Grid item md={listView === 'list' ? 12 : 4} sm={listView === 'list' ? 12 : 6} xs={12} key={index.toString()}>
                  <ProductCard
                    list={listView === 'list'}
                    name={product.get('name')}
                    thumbnail={product.get('thumbnail')}
                    desc={product.get('desc')}
                    ratting={product.get('ratting')}
                    price={product.get('price')}
                    prevPrice={product.get('prevPrice')}
                    discount={product.get('discount')}
                    soldout={product.get('soldout')}
                    detailOpen={() => this.handleDetailOpen(product)}
                    addToCart={() => handleAddToCart(itemAttr)}
                  />
                </Grid>
              );
            })
          }
        </Grid>
      </div>
    );
  }
}

ProductGallery.propTypes = {
  dataProduct: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
  productIndex: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
  listView: PropTypes.string.isRequired
};

export default ProductGallery;
