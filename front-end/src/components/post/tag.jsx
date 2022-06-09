import React from 'react';

const Tag = ({ tagList, setTagList }) => {
	// const [{ tag }] = tagList;

	const maxTag = 10;
	const handleTagChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...tagList];
		list[index][name] = value;
		setTagList(list);
	};

	const handleTagRemove = (index) => {
		const list = [...tagList];
		list.splice(index, 1);
		setTagList(list);
	};

	const handleTagAdd = () => {
		setTagList([...tagList, { tag: '' }]);
	};

	return (
		<div className="info__container">
			<h3 className="info__title">THẺ</h3>
			<div className="col-half-balance">
				{tagList.map((singleTag, index) => (
					<div key={index}>
						<div className="info__form-group ">
							<div className="in-row">
								<input
									className="info__form-input"
									id="tag"
									name="tag"
									type="text"
									required
									placeholder="Nhập tên thẻ"
									value={singleTag.tag}
									onChange={(e) => handleTagChange(e, index)}
								/>
								{tagList.length !== 1 && (
									<button
										type="button"
										onClick={() => handleTagRemove(index)}
										className="remove-btn"
									>
										<i class="fas fa-minus"></i>
									</button>
								)}
								{/* {tagList.length - 1 === index && tagList.length < 4
									? setIsShowAdd(true)
									: setIsShowAdd(false)} */}
							</div>
						</div>
					</div>
				))}
			</div>

			{tagList.length < maxTag && (
				<div className="info__form-group col-full">
					<button type="button" onClick={handleTagAdd} className="add-btn">
						<i class="fa fa-plus"></i>
					</button>
				</div>
			)}
		</div>
	);
};

export default Tag;
