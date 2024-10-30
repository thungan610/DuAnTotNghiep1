import { StyleSheet, } from 'react-native'


const ProductReviewStyle = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 50,

  },
  nameProduct: {
    backgroundColor: '#29abe2',
    alignItems: 'center',
    marginLeft: 15,
    padding: 10,
    width: '92%',
  },
  nameProductText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  star: {
    fontSize: 32,
    color: '#ccc',
    margin: 5,
  },
  selectedStar: {
    fontSize: 32,
    color: '#ffd700',
    margin: 5,
  },
  ratingText: {
    fontSize: 20,
    marginLeft: 10,
  },
  boxStar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  textStar: {
    fontSize: 20,
    marginLeft: 5,
    color: 'black',

  },
  theStar: {
    flexDirection: 'row',
  },
  boxStarContainer: {
    padding: 5,
    width: '92%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginLeft: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  boxCamera: {
    marginTop: 5,
    width: 150,
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    borderColor: '#FF7400',
    marginRight: 10,
    marginLeft: 5,
  },
  imgCamera: {
    marginLeft: 5,
  },
  textCamera: {
    color: 'black',
    fontSize: 18,
  },
  input: {
    marginTop: 15,
    backgroundColor: '#EDEAEA',
    height: 150, // Chiều cao của ô nhập
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top', // Đặt văn bản ở đầu ô
  },
  textRed: {
    color: 'red',
    fontSize: 18,
  },
  boxReview: {
    borderWidth: 1,
    padding: 8,
    borderColor: '#FF7400',
    width: 120,
    borderRadius: 5,
    marginLeft: 225,
    marginTop: 15,
    marginBottom: 10,
  },
  textReview: {
    color: '#FF7400',
    fontSize: 18,
    marginLeft: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  imageWrapper: {
    marginRight: 10,
    position: 'relative',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 2,
  },
  deleteText: {
    color: 'white',
    fontSize: 12,
  },
})
export default ProductReviewStyle