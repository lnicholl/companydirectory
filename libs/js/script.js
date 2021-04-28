// GET all function

function getAll() {
	$.ajax({
		url: "libs/php/getAll.php",
		type: 'GET',
		dataType: 'json',
		success: function (result) {
			console.log(result);
			if (result.status.name == "ok") {
				$.each(result.data, i => {
					$('#mainData').append("<tr><td id='firstNameData'>" + result['data'][i]['firstName'] + "</td><td id='lastNameData'>" + result['data'][i]['lastName'] + "</td><td id='jobTitleData'>" + result['data'][i]['jobTitle'] + "</td><td id='emailData'><a href='mailto:" + result['data'][i]['email'] + "' style='text-decoration:none'>" + result['data'][i]['email'] + "</a></td><td id='departmentData'>" + result['data'][i]['department'] + "</td><td id='locationData'>" + result['data'][i]['location'] + "</td><td class='centered' id='editEmployeeData'><i class='far fa-edit' id='editIcon' title='Edit' onClick=\"updateEmployee('" + result['data'][i]['firstName'] + "', '" + result['data'][i]['lastName'] + "', '" + result['data'][i]['jobTitle'] + "', '" + result['data'][i]['email'] + "', " + result['data'][i]['id'] + ")\"></i></td><td class='centered' id='deleteEmployeeData'><i class='far fa-trash-alt' id='deleteIcon' title='Delete' onClick=\"deleteEmployeeModal('" + result['data'][i]['firstName'] + "', '" + result['data'][i]['lastName'] + "', " + result['data'][i]['id'] + ")\"></i></td></tr>");
				});

				$('#mainTable').DataTable({
					dom: 'Bflrtip',
					buttons: [{
						text: '+ Add',
						action: function (e, dt, node, config) {
							$('#addEmployeeModal').modal('show');

							$.ajax({
								url: "libs/php/getAllDepartments.php",
								type: 'GET',
								dataType: 'json',
								success: function (result) {
									console.log(result);
									if (result.status.name == "ok") {
										$.each(result.data, i => {
											$('#addEmployeeDepartment').append($("<option>", {
												text: result.data[i].name,
												value: result.data[i].id
											}));
										});
									};
								},
								error: function (jqXHR, textStatus, errorThrown) {
									console.log(errorThrown);
									console.log(textStatus);
									console.log(jqXHR);
								}
							});
						}
					}],
					columnDefs: [{
						orderable: false,
						targets: [-1, -2]
					}],
					"scrollY": "50vh",
					"paging": false,
					"info": false,
				});
			};
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
};

$(document).ready(() => {
	getAll();
});

// GET all departments
$("#getAllDepartments").on('click', () => {
	$.ajax({
		url: "libs/php/getAllDepartments.php",
		type: 'GET',
		dataType: 'json',
		success: function (result) {
			console.log(result);
			if (result.status.name == "ok") {
				$.each(result.data, i => {
					$('#departmentsModal').modal('show');
					$('#departmentsData').append("<tr><td>" + result['data'][i]['name'] + "</td><td class='centered'><i class='far fa-edit' id='editIcon' title='Edit' onClick=\"updateDepartment('" + result['data'][i]['name'] + "', " + result['data'][i]['id'] + ")\"></i></td><td class='centered'><i class='far fa-trash-alt' id='deleteIcon' title='Delete' onClick=\"deleteDepartment('" + result['data'][i]['name'] + "', " + result['data'][i]['id'] + ")\"></i></td></tr>");
				});
			};
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
});

$("#addDepartment").on('click', () => {
	$('#departmentsModal').modal('hide');
	$('#addDepartmentModal').modal('show');
});

// GET all locations

$("#getAllLocations").on('click', () => {
	$.ajax({
		url: "libs/php/getAllLocations.php",
		type: 'GET',
		dataType: 'json',
		success: function (result) {
			console.log(result);
			if (result.status.name == "ok") {
				$.each(result.data, i => {
					$('#locationsModal').modal('show');
					$('#locationsData').append("<tr><td>" + result['data'][i]['name'] + "</td><td class='centered'><i class='far fa-edit' id='editIcon' title='Edit' onClick=\"updateLocation('" + result['data'][i]['name'] + "', " + result['data'][i]['id'] + ")\"></i></td><td class='centered'><i class='far fa-trash-alt' id='deleteIcon' title='Delete' onClick=\"deleteLocation('" + result['data'][i]['name'] + "', " + result['data'][i]['id'] + ")\"></i></td></tr>");
				});
			};
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});
});

$("#addLocation").on('click', () => {
	$('#locationsModal').modal('hide');
	$('#addLocationModal').modal('show');
});

// insert department + select location

$.ajax({
	url: "libs/php/getAllLocations.php",
	type: 'GET',
	dataType: 'json',
	success: function (result) {
		console.log(result);
		if (result.status.name == "ok") {
			$.each(result.data, i => {
				$('#addDepartmentLocation').append($("<option>", {
					text: result.data[i].name,
					value: result.data[i].id
				}));
			});
		};
	},
	error: function (jqXHR, textStatus, errorThrown) {
		console.log(errorThrown);
		console.log(textStatus);
		console.log(jqXHR);
	}
});

$("#insertDepartment").on('click', () => {
	if ($("#addDepartmentName").val() != "" && $("#addDepartmentLocation").val() != "" && $("#addDepartmentCheckbox").prop("checked") != false) {
		$.ajax({
			url: "libs/php/insertDepartment.php",
			type: 'POST',
			dataType: 'json',
			data: {
				name: $("#addDepartmentName").val(),
				locationID: $("#addDepartmentLocation").val()
			},
			success: function (result) {
				console.log(result);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
				console.log(jqXHR);
			}
		});
	};
});

// insert location

$("#insertLocation").on('click', () => {
	if ($("#addLocationName").val() != "" && $("#addLocationCheckbox").prop("checked") != false) {
		$.ajax({
			url: "libs/php/insertLocation.php",
			type: 'POST',
			dataType: 'json',
			data: {
				name: $("#addLocationName").val()
			},
			success: function (result) {
				console.log(result);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
				console.log(jqXHR);
			}
		});
	};
});

// insert employee

$("#insertEmployee").on('click', () => {
	if ($("#addEmployeeFirstName").val() != "" && $("#addEmployeeLastName").val() != "" && $("#addEmployeeJobTitle").val() != "" && $("#addEmployeeEmail").val() != "" && $("#addEmployeeDepartment").val() != "" && $("#addEmployeeLocation").val() != "" && $("#addEmployeeCheckbox").prop("checked") != false) {
		$.ajax({
			url: "libs/php/insertEmployee.php",
			type: 'POST',
			dataType: 'json',
			data: {
				firstName: $("#addEmployeeFirstName").val(),
				lastName: $("#addEmployeeLastName").val(),
				jobTitle: $("#addEmployeeJobTitle").val(),
				email: $("#addEmployeeEmail").val(),
				departmentID: $("#addEmployeeDepartment").val()
			},
			success: function (result) {
				console.log(result);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
				console.log(jqXHR);
			}
		});
	};
});

// update department

function updateDepartment(name, id) {
	$('#departmentsModal').modal('hide');
	$("#editDepartmentModal").modal('show');
	$("#editDepartmentName").val(name);

	$.ajax({
		url: "libs/php/getAllLocations.php",
		type: 'GET',
		dataType: 'json',
		success: function (result) {
			console.log(result);
			if (result.status.name == "ok") {
				$.each(result.data, i => {
					$('#editDepartmentLocation').append($("<option>", {
						text: result.data[i].name,
						value: result.data[i].id
					}));
				});
			};
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

	$("#updateDepartment").on('click', () => {
		if ($("#editDepartmentName").val() != "" && $("#editDepartmentLocation").val() != "" && $("#editDepartmentCheckbox").prop("checked") != false) {
			$.ajax({
				url: "libs/php/updateDepartment.php",
				type: 'POST',
				dataType: 'json',
				data: {
					name: $("#editDepartmentName").val(),
					locationID: $("#editDepartmentLocation").val(),
					departmentID: id
				},
				success: function (result) {
					console.log(result);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(errorThrown);
					console.log(textStatus);
					console.log(jqXHR);
				}
			});
		};
	});
};

// update location

function updateLocation(name, id) {
	$('#locationsModal').modal('hide');
	$("#editLocationModal").modal('show');
	$("#editLocationName").val(name);

	$("#updateLocation").on('click', () => {
		if ($("#editLocationName").val() != "" && $("#editLocationCheckbox").prop("checked") != false) {
			$.ajax({
				url: "libs/php/updateLocation.php",
				type: 'POST',
				dataType: 'json',
				data: {
					name: $("#editLocationName").val(),
					locationID: id
				},
				success: function (result) {
					console.log(result);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(errorThrown);
					console.log(textStatus);
					console.log(jqXHR);
				}
			});
		};
	});
};

// update employee

function updateEmployee(firstName, lastName, jobTitle, email, id) {
	$("#editEmployeeModal").modal('show');
	$("#editEmployeeFirstName").val(firstName);
	$("#editEmployeeLastName").val(lastName);
	$("#editEmployeeJobTitle").val(jobTitle);
	$("#editEmployeeEmail").val(email);

	$.ajax({
		url: "libs/php/getAllDepartments.php",
		type: 'GET',
		dataType: 'json',
		success: function (result) {
			console.log(result);
			if (result.status.name == "ok") {
				$.each(result.data, i => {
					$('#editEmployeeDepartment').append($("<option>", {
						text: result.data[i].name,
						value: result.data[i].id
					}));
				});
			};
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(errorThrown);
			console.log(textStatus);
			console.log(jqXHR);
		}
	});

	$("#updateEmployee").on('click', () => {
		if ($("#editEmployeeFirstName").val() != "" && $("#editEmployeeLastName").val() != "" && $("#editEmployeeJobTitle").val() != "" && $("#editEmployeeEmail").val() != "" && $("#editEmployeeDepartment").val() != "" && $("#editEmployeeCheckbox").prop("checked") != false) {
			$.ajax({
				url: "libs/php/updateEmployee.php",
				type: 'POST',
				dataType: 'json',
				data: {
					firstName: $("#editEmployeeFirstName").val(),
					lastName: $("#editEmployeeLastName").val(),
					jobTitle: $("#editEmployeeJobTitle").val(),
					email: $("#editEmployeeEmail").val(),
					departmentID: $("#editEmployeeDepartment").val(),
					employeeID: id
				},
				success: function (result) {
					console.log(result);
				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(errorThrown);
					console.log(textStatus);
					console.log(jqXHR);
				}
			});
		};
	});
};

// delete department

function deleteDepartment(name, id) {
	$('#departmentsModal').modal('hide');
	$("#deleteDepartmentModal").modal('show');
	$("#deleteDepartmentName").html(name);

	$("#deleteDepartment").on('click', () => {
		$.ajax({
			url: "libs/php/deleteDepartmentByID.php",
			type: 'POST',
			dataType: 'json',
			data: {
				id: id
			},
			success: function (result) {
				console.log(result);
				if (result.status.name == "ok") {
					$('#deleteDepartmentModal').fadeOut(1000, () => {
						$('#deleteDepartmentModal').modal('hide');
					});
				};
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
				console.log(jqXHR);
			}
		});
	});
};

// delete location

function deleteLocation(name, id) {
	$('#locationsModal').modal('hide');
	$("#deleteLocationModal").modal('show');
	$("#deleteLocationName").html(name);

	$("#deleteLocation").on('click', () => {
		$.ajax({
			url: "libs/php/deleteLocationByID.php",
			type: 'POST',
			dataType: 'json',
			data: {
				id: id
			},
			success: function (result) {
				console.log(result);
				if (result.status.name == "ok") {
					$('#deleteLocationModal').fadeOut(1000, () => {
						$('#deleteLocationModal').modal('hide');
					});
				};
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
				console.log(jqXHR);
			}
		});
	});
};

// delete employee

function deleteEmployeeModal(firstName, lastName, id) {
	$("#deleteEmployeeModal").modal('show');
	$("#deleteEmployeeName").html(firstName + ' ' + lastName);

	$("#deleteEmployee").on('click', () => {
		$.ajax({
			url: "libs/php/deleteEmployeeByID.php",
			type: 'POST',
			dataType: 'json',
			data: {
				id: id
			},
			success: function (result) {
				console.log(result);
				if (result.status.name == "ok") {
					$('#deleteEmployeeModal').fadeOut(1000, () => {
						$('#deleteEmployeeModal').modal('hide');
						location.reload();
					});
				};
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
				console.log(textStatus);
				console.log(jqXHR);
			}
		});
	});
};

// close all modals and reset data where appropriate

$('.close').on('click', () => {
	$('#departmentsModal').modal('hide');
	$('#addDepartmentModal').modal('hide');
	$('#editDepartmentModal').modal('hide');
	$('#deleteDepartmentModal').modal('hide');
	$('#locationsModal').modal('hide');
	$('#addLocationModal').modal('hide');
	$('#editLocationModal').modal('hide');
	$('#deleteLocationModal').modal('hide');
	$('#addEmployeeModal').modal('hide');
	$("#editEmployeeModal").modal('hide');
	$("#deleteEmployeeModal").modal('hide');
});

$('#departmentsModal').on('hidden.bs.modal', () => {
	$('#departmentsModal').find('tbody').empty();
});

$('#editDepartmentModal').on('hidden.bs.modal', () => {
	$('#editDepartmentModal').find('select').empty();
});

$('#locationsModal').on('hidden.bs.modal', () => {
	$('#locationsModal').find('tbody').empty();
});

$('#addEmployeeModal').on('hidden.bs.modal', () => {
	$('#addEmployeeModal').find('select').empty();
});

$('#editEmployeeModal').on('hidden.bs.modal', () => {
	$('#editEmployeeModal').find('select').empty();
});