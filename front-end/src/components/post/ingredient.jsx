import React from 'react';

const Ingredient = ({ ingredientList, setIngredientList }) => {
	// const [{ ingredient }] = ingredientList;
	const maxIngredient = 100;
	const handleIngredientChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...ingredientList];
		list[index][name] = value;
		setIngredientList(list);
	};

	const handleIngredientRemove = (index) => {
		const list = [...ingredientList];
		list.splice(index, 1);
		setIngredientList(list);
	};

	const handleIngredientAdd = () => {
		setIngredientList([...ingredientList, { ingredient: '' }]);
	};

	return (
		<div className="info__container">
			<h3 className="info__title">NGUYÊN LIỆU</h3>

			{ingredientList.map((singleIngredient, index) => (
				<div key={index}>
					<div className="info__form-group col-full">
						<div className="in-row">
							{/* <label htmlFor="ingredient" className="info__form-label"></label> */}
							<input
								className="info__form-input"
								id="ingredient"
								name="ingredient"
								type="text"
								required
								placeholder="Nhập nguyên liệu"
								value={singleIngredient.ingredient}
								onChange={(e) => handleIngredientChange(e, index)}
							/>
							{ingredientList.length !== 1 && (
								<button
									type="button"
									onClick={() => handleIngredientRemove(index)}
									className="remove-btn"
								>
									<i class="fas fa-minus"></i>
								</button>
							)}
						</div>
					</div>
					<div className="info__form-group col-full">
						{ingredientList.length - 1 === index &&
							ingredientList.length < maxIngredient && (
								<button
									type="button"
									onClick={handleIngredientAdd}
									className="add-btn"
								>
									<i class="fa fa-plus"></i>
								</button>
							)}
					</div>
				</div>
			))}
		</div>
	);
};

export default Ingredient;
