(function() {
	"use strict";

	angular
		.module('ebook-core')
		.config(config);


	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise("/home");

		$stateProvider
		.state("main.listCategory", {
			url: '/categories',
			views:{
				'main@': {
					resolve: {
						categories: getCategories	
					},
					templateUrl: "app/components/category/category.list.html",
					controller: "CategoryListController",
					controllerAs: "clc"
				}
			}
		})
		.state("main.editCategory", {
			url: '/category/:id',
			views:{
				'main@': {
					resolve: {
						category: editCategory,
						title: editTitle
					},
					templateUrl: "app/components/category/category.html",
					controller: "CategoryController",
					controllerAs: "ccr"
				}
			}
		})
		.state("main.newCategory", {
			url: '/categories/new',
			views:{
				'main@': {
					resolve: {
						category: newCategory,
						title: newTitle
					},
					templateUrl: "app/components/category/category.html",
					controller: "CategoryController",
					controllerAs: "ccr"
				}
			}
		});
		
		getCategories.$inject = ['Category'];
		function getCategories(Category) {
			return Category.query().$promise;
		}
		
		newCategory.$inject = ['Category'];
		function newCategory(Category) {
			return new Category();
		}
		
		editCategory.$inject = ['$stateParams', 'Category'];
		function editCategory($stateParams, Category) {
			return Category.get({id: $stateParams.id}).$promise;
		}
		
		function newTitle() {
			return "New category";
		}
		
		editTitle.$inject = ['$stateParams'];
		function editTitle($stateParams) {
			return "Edit category with id " + $stateParams.id;
		}
	}
})();
