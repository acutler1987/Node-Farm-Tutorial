module.exports = (temp, product) => {
	let output = temp.replace(/{%ID%}/g, product.id);
	output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%FROM%}/g, product.from);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);

	if (!product.organic)
		output = output.replace(/{%NOTORGANIC%}/g, 'not-organic');
	// output = product.organic
	// 	? output.replace(/{%ORGANIC%}/g, product.organic)
	// 	: output.replace(/{%NOTORGANIC%}/g, product.organic);

	return output;
};
