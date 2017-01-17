(function() {
	"use strict";

	angular
		.module('ebook-core')
		.config(config);


	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){

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
						title: editTitle,
						books: getBooks
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
						title: newTitle,
						books: getBooks
					},
					templateUrl: "app/components/category/category.html",
					controller: "CategoryController",
					controllerAs: "ccr"
				}
			}
		})
		.state("main.categoryBooks", {
			url: '/categorie/:id/books',
			views:{
				'main@': {
					resolve: {
						category: editCategory,
						title: categoryBooksTitle,
						books: getBooks
					},
					templateUrl: "app/components/category/category.listOfBooks.html",
					controller: "CategoryController",
					controllerAs: "ccr"
				}
			}
		});
		
		getBooks.$inject = ['Book'];
		function getBooks(Book) {
			return Book.query().$promise;
		}
		
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
		
		function categoryBooksTitle() {
			return "Books from selected category";
		}
		
		editTitle.$inject = ['$stateParams'];
		function editTitle($stateParams) {
			return "Edit category with id " + $stateParams.id;
		}
	}
})();
