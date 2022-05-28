import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
const Instruction = ({ instructionList, setInstructionList }) => {
	const handleInstructionChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...instructionList];
		list[index][name] = value;
		setInstructionList(list);
	};

	const handleInstructionRemove = (index) => {
		const list = [...instructionList];
		list.splice(index, 1);
		setInstructionList(list);
	};

	const handleInstructionAdd = () => {
		setInstructionList([...instructionList, { instruction: '' }]);
	};

	return (
		<div className="info__container">
			<h3 className="info__title">THỰC HIỆN</h3>

			{instructionList.map((singleInstruction, index) => (
				<div key={index}>
					<div className="info__form-group col-full">
						<label htmlFor="instruction" className="info__form-label">
							Bước {index + 1}
						</label>
						<div className="in-row">
							<textarea
								className="info__form-textarea"
								id="instruction"
								name="instruction"
								type="text"
								placeholder="Nhập hướng dẫn thực hiện"
								required
								value={singleInstruction.instruction}
								onChange={(e) => handleInstructionChange(e, index)}
							/>
							{instructionList.length !== 1 && (
								<button
									type="button"
									onClick={() => handleInstructionRemove(index)}
									className="remove-btn"
								>
									<i class="fas fa-minus"></i>
								</button>
							)}
						</div>
					</div>
					<div className="info__form-group col-full">
						{instructionList.length - 1 === index &&
							instructionList.length < 4 && (
								<button
									type="button"
									onClick={handleInstructionAdd}
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

export default Instruction;
